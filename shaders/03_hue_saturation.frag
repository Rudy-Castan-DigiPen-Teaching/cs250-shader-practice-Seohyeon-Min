#ifdef GL_ES
precision mediump float;
#endif


/**
 * \file
 * \author Seohyeon Min
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */


#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(0.0, 0.0, 0.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0, 0.0, 0.0);

    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x) * 5. + u_time * 999.;
    float radius = length(toCenter)*2.7;

    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius+ sin(u_time * 9.),1.0 ));

    gl_FragColor = vec4(color,1.0);
}
