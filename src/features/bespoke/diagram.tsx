import { edgeLabels, shapeLabels, type Configuration } from './model';

export function ConfigurationDiagram({ config, colour }: { config: Configuration; colour: string }) {
  const width = Math.max(100, Math.min(5000, config.width ?? 1000));
  const depth = Math.max(100, Math.min(5000, config.depth ?? 600));
  const height = Math.max(50, Math.min(2000, config.height ?? 500));
  const scale = Math.min(360 / width, 170 / depth);
  const w = width * scale, d = depth * scale, x = (540 - w) / 2, y = 70 + (170 - d) / 2;
  const sideScale = Math.min(360 / width, 105 / height);
  const sw = width * sideScale, sh = height * sideScale, sx = (540 - sw) / 2, sy = 365 - sh / 2;
  const label = `${shapeLabels[config.shape]} ${config.type.replaceAll('-', ' ')}, ${config.width ?? 'undecided'} by ${config.depth ?? 'undecided'} by ${config.height ?? 'undecided'} millimetres. ${edgeLabels[config.edge]} edge direction. Indicative drawing only.`;
  return <svg viewBox="0 0 540 480" className="configuration-diagram" role="img" aria-label={label}>
    <defs><pattern id="drawing-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#ded6c9" strokeWidth=".6" /></pattern></defs>
    <rect width="540" height="480" fill="url(#drawing-grid)" />
    <text x="30" y="30" className="drawing-label">01 / PLAN VIEW</text>
    <g fill={colour} stroke="#363a30" strokeWidth="1.5">
      {config.shape === 'round' || config.shape === 'oval' ? <ellipse cx="270" cy={y+d/2} rx={w/2} ry={d/2} /> : config.shape === 'organic' ? <path d={`M ${x+w*.15} ${y+d*.08} C ${x+w*.5} ${y-d*.07}, ${x+w} ${y+d*.04}, ${x+w} ${y+d*.45} C ${x+w} ${y+d*.88}, ${x+w*.6} ${y+d*1.05}, ${x+w*.4} ${y+d*.89} C ${x+w*.15} ${y+d*.8}, ${x-w*.05} ${y+d*.65}, ${x+w*.02} ${y+d*.38} Q ${x+w*.04} ${y+d*.12} ${x+w*.15} ${y+d*.08} Z`} /> : <rect x={x} y={y} width={w} height={d} rx={config.edge === 'bullnose' ? 12 : 2} />}
      {config.type === 'basin' && <ellipse cx="270" cy={y+d/2} rx={w*.36} ry={d*.32} fill="none" />}
      {config.type === 'basin' && <circle cx="270" cy={y+d/2} r="4" fill="#f4f0e8" />}
    </g>
    <g stroke="#726b60" strokeWidth=".8"><path d={`M${x} 258H${x+w} M${x} 252v12 M${x+w} 252v12`} /><path d={`M${x+w+24} ${y}v${d} M${x+w+18} ${y}h12 M${x+w+18} ${y+d}h12`} /></g>
    <text x="270" y="279" textAnchor="middle" className="drawing-dimension">{config.shape === 'round' ? 'Ø ' : ''}{config.width ?? '—'} mm</text>
    {config.shape !== 'round' && <text x={x+w+34} y={y+d/2} textAnchor="middle" transform={`rotate(-90 ${x+w+34} ${y+d/2})`} className="drawing-dimension">{config.depth ?? '—'} mm</text>}
    <text x="30" y="305" className="drawing-label">02 / ELEVATION</text>
    <g stroke="#363a30" strokeWidth="1.5" fill={colour}>
      {config.type === 'basin' ? <path d={`M${sx} ${sy}h${sw}q${-sw*.05} ${sh} ${-sw*.2} ${sh}h${-sw*.6}q${-sw*.15} 0 ${-sw*.2} ${-sh}Z`} /> : <><rect x={sx} y={sy} width={sw} height="9" rx={config.edge === 'bullnose' ? 4 : 0} />{config.edge === 'waterfall' ? <><rect x={sx} y={sy+9} width="9" height={Math.max(1,sh-9)} /><rect x={sx+sw-9} y={sy+9} width="9" height={Math.max(1,sh-9)} /></> : <><path d={`M${sx+sw*.22} ${sy+9}v${Math.max(1,sh-9)} M${sx+sw*.78} ${sy+9}v${Math.max(1,sh-9)}`} fill="none" strokeDasharray="4 4" /></>}</>}
    </g>
    <path d={`M${sx+sw+24} ${sy}v${sh} M${sx+sw+18} ${sy}h12 M${sx+sw+18} ${sy+sh}h12`} fill="none" stroke="#726b60" strokeWidth=".8" />
    <text x={sx+sw+34} y={sy+sh/2} textAnchor="middle" transform={`rotate(-90 ${sx+sw+34} ${sy+sh/2})`} className="drawing-dimension">{config.height ?? '—'} mm</text>
    <text x="270" y="446" textAnchor="middle" className="drawing-label">{edgeLabels[config.edge].toUpperCase()} EDGE DIRECTION</text>
    <text x="270" y="467" textAnchor="middle" className="drawing-note">Indicative outline · colour only · support design to be confirmed</text>
  </svg>;
}
