#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.8745, 0.0902, 0.9804);
vec3 colorB = vec3(0.5725, 1.0, 0.2235);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    float mouseX = -u_mouse.x/u_resolution.x;

    vec3 pct = vec3(st.x);

    pct.r = smoothstep(0.0,1.0, st.x+mouseX+sin(u_time *5.));
    pct.g = sin(st.x*PI+mouseX+sin(u_time));
    pct.b = pow(st.x,0.5+mouseX+sin(u_time));

    color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}
