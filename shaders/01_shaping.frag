#version 300 es
precision mediump float;

/**
 * \file
 * \author Seohyeon Min
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

out vec4 FragColor;

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}


void main(){
    float freq = 15.;

    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = pow(st.x,sin(st.x * freq + u_time));
    float x = pow(st.y,sin(st.y * freq + u_time));

    vec3 color = vec3(y);
    vec3 color2 = vec3(x);

    float pct = plot(st,y);
    color = (0.20-pct)*color2+pct*vec3(0.0,6.0,66.0);
    
    FragColor = vec4(color,1.0);
}