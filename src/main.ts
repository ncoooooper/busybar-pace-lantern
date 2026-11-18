import {desk,duration} from "@shared/desk";

type S={pace:number;begin:number;km:number;cross:number;elapsed:boolean};
desk<S>({name:"Pace Lantern",accent:"#ECA64C",motion:{enabled:false},initial:()=>({pace:300,begin:0,km:0,cross:0,elapsed:false}),
 render:(s,now)=>{const gap=s.cross-s.begin-s.km*s.pace*1000,shown=s.elapsed&&s.begin?duration(now-s.begin):s.km?(gap>0?"+":"-")+duration(Math.abs(gap)):duration(s.pace*1000);
 return {title:!s.begin?"Target / km":s.elapsed?"Elapsed":s.km?"Split vs plan":"To first km",value:shown,lines:["Plan "+duration(s.pace*1000)+" / km","Distance "+s.km+" km",s.km?(gap>0?"Behind plan":"On or ahead of plan"):"Click at next kilometer","Click: mark kilometer","Start: elapsed / split","Hold Start: reset"]};},
 action:(s,k,now)=>{if(k==="hold-start"){s.begin=0;s.km=0;s.cross=0;s.elapsed=false;}else if(k==="ok"){if(!s.begin)s.begin=now;else{s.km++;s.cross=now;}}
 else if(k==="start")s.elapsed=!s.elapsed;else if(!s.begin&&(k==="up"||k==="down"))s.pace=Math.max(90,Math.min(1200,s.pace+(k==="up"?5:-5)));},
 ticking:s=>Boolean(s.begin&&s.elapsed)});
