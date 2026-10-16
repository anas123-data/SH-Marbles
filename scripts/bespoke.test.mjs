import test from 'node:test';
import assert from 'node:assert/strict';
import { allowedEdges, buildInquiryText, changeShape, changeType, configurationErrors, defaultConfiguration, emptyInquiry, qualifyInquiry, validateInquiry } from '../src/features/bespoke/model.ts';
import { validateReferenceFiles, referenceLimits } from '../src/features/bespoke/files.ts';

const valid = () => ({ ...emptyInquiry(), name: 'Test Designer', country: 'Pakistan', destination: 'Lahore', email: 'designer@example.com', message: 'A round side table for a reading room.', consent: true });
test('round dimensions stay equal; switching type resets form but keeps colour', () => {
  const round = changeShape({ ...defaultConfiguration(), materialId: 'ink' }, 'round');
  assert.equal(round.width, round.depth);
  assert.deepEqual(configurationErrors(round, ['ink']), {});
  const basin = changeType(round, 'basin');
  assert.equal(basin.materialId, 'ink'); assert.equal(basin.width, 500); assert.equal(basin.shape, 'rectangle');
  assert.deepEqual(allowedEdges('basin', 'round'), ['straight', 'bullnose']);
});
test('reject impossible builder states and nonnumeric dimensions at boundary', () => {
  const config = { ...defaultConfiguration('console'), edge: 'waterfall' };
  assert.equal(changeShape(config, 'oval').edge, 'straight');
  for (const value of [null, 0, -1, 5001, 200.5, NaN, Infinity, '1000']) assert.ok(configurationErrors({ ...config, width: value }, []).width);
  assert.ok(configurationErrors({ ...config, shape: 'organic' }, []).shape);
  assert.ok(configurationErrors({ ...config, materialId: 'invented' }, []).materialId);
  assert.ok(configurationErrors({ ...config, feasibility: 'approved' }, []).configuration);
  assert.ok(configurationErrors({ ...config, shape: 'round' }, []).depth);
});
test('require contact, location, notes and draft acknowledgement; normalize whitespace', () => {
  assert.deepEqual(validateInquiry(valid()).errors, {});
  assert.equal(validateInquiry({ ...valid(), name: '  Test Designer  ' }).fields.name, 'Test Designer');
  for (const override of [{ email: '', phone: '' }, { email: 'wrong' }, { phone: 'abc' }, { country: '' }, { destination: '' }, { message: 'short' }, { consent: false }, { quantity: '1.5' }, { budget: 'free' }, { website: 'bot' }, { name: 'x\u0000y' }]) assert.ok(Object.keys(validateInquiry({ ...valid(), ...override }).errors).length);
  assert.deepEqual(validateInquiry({ ...valid(), email: '', phone: '+92 300 1234567' }).errors, {});
  assert.ok(Object.keys(validateInquiry(null).errors).length);
});
test('export states draft status and separates file references from actual attachments', () => {
  const text = buildInquiryText(valid(), defaultConfiguration(), 'To discuss', { piece: 'Side table' }, ['drawing.pdf']);
  assert.match(text, /has not been sent/); assert.match(text, /not embedded/); assert.match(text, /drawing.pdf/); assert.match(text, /Side table/); assert.match(text, /Feasibility/);
});
test('qualification measures brief completeness without country or identity bias', () => {
  const a = qualifyInquiry(valid(), false);
  const b = qualifyInquiry({ ...valid(), country: 'United States', name: 'Another Person' }, false);
  assert.deepEqual(a, b);
  assert.ok(qualifyInquiry({ ...valid(), quantity: '20', timeline: 'Within 3 months', budget: '1,000–5,000' }, true).score > a.score);
});
test('reference selection enforces signature, type, count and size', async () => {
  const png = new File([new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,0])], 'reference.png', { type: 'image/png' });
  const pdf = new File(['%PDF-1.7'], 'drawing.pdf', { type: 'application/pdf' });
  assert.equal(await validateReferenceFiles([png, pdf]), null);
  for (const files of [[new File(['fake'], 'fake.png', { type: 'image/png' })], [new File(['<svg/>'], 'vector.svg', { type: 'image/svg+xml' })], [png,png,png,png], [new File([new Uint8Array(referenceLimits.each + 1)], 'huge.png', { type: 'image/png' })], [new File([], 'empty.pdf', { type: 'application/pdf' })]]) assert.ok(await validateReferenceFiles(files));
});
