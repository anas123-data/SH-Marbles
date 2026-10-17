import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
export const runtime='nodejs';
export const dynamic='force-static';
export async function GET(){
  const photograph=await readFile(path.join(process.cwd(),'public/social/black-basin.jpg'));
  return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#11120f',color:'#f0eee7'}}><div style={{display:'flex',flexDirection:'column',width:690,padding:'60px 64px',justifyContent:'space-between'}}><div style={{display:'flex',flexDirection:'column'}}><span style={{fontSize:32,letterSpacing:'5px'}}>SH MARBLES</span><span style={{fontSize:11,letterSpacing:'4px',color:'#d1bda3',marginTop:14}}>THE STONE ATELIER</span></div><div style={{display:'flex',flexDirection:'column',fontSize:75,lineHeight:1.05,letterSpacing:'-4px'}}><span>Stone.</span><span style={{color:'#d1bda3'}}>With presence.</span></div><span style={{fontSize:18,color:'#b4b6ac'}}>Tables · Basins · Objects · Bespoke</span></div><img alt="Dark fluted basin with pale veins" width={510} height={630} src={`data:image/jpeg;base64,${photograph.toString('base64')}`} style={{objectFit:'cover',objectPosition:'50% 65%'}}/></div>,{width:1200,height:630});
}
