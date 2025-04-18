#version 300 es
precision mediump float;

/**
 * \file
 * \author Rudy Castan
 * \author Seohyeon Min
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */


out vec4 FragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//convert pixel coords to normalized coords
 vec2 to_coord(vec2 pixel_point)
 {
    vec2 point = pixel_point / u_resolution;
    if(u_resolution.x > u_resolution.y)
    {
        // wide not tall
        // height is going to between 0-1
        // width is going to be expanded, larger than 0-1
        point.x *= u_resolution.x / u_resolution.y;
        // now to recenter the range
        point.x += (u_resolution.y - u_resolution.x) / (u_resolution.x);
    }
    else
    {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }

    return point;
 }

 float sCircle(vec2 point, vec2 center, float radius)
 {
    float d = distance(point, center);
    return d - radius;
 }

 // return 0 not in circle, 1 in circle
 float circle(vec2 point, vec2 center, float radius)
 {
    float sd = sCircle(point, center, radius);
    // return 1.0 - step(0., sd);
    float E = fwidth(sd);
    return 1. - smoothstep(-E, E, sd);
 }

 void main(void)
 {
    vec2 position = to_coord(gl_FragCoord.xy);
    vec3 color = vec3(1);
    const int LOOP_COUNT = 24;
    for (int i = 0; i < LOOP_COUNT; ++i) 
    {
        float dist2 = 0.25 + float(i) * 0.4;
        float x = 2. + float(i) * 0.1;
        vec2 p = vec2(cos(u_time + x), sin(u_time - x * 0.6))*dist2 / float(LOOP_COUNT)+ vec2(0.5);

        float size = 0.10 + float(i) * -0.01;
        float t = circle(position, p, size);
    
        color = mix(color, vec3(1) - vec3(float(i)*0.05), t);
    }

    FragColor = vec4(color, 1.0);
 }
