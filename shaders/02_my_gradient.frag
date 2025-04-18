#version 300 es
precision mediump float;

out vec4 FragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    // 정규화 좌표 (0.0 ~ 1.0)
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    // 곡선 형태를 주기 위한 변수 설정
    // (st.x - 0.5)를 통해 화면 중앙(0.5) 기준 좌우 대칭을 만듦
    float curve = 0.5 * pow((st.x - 0.5) * 1.4, 4.0);
    
    // U자 형태를 만들기 위해 st.y에 오프셋(0.4)을 더하고, 좌우 곡선 값을 빼줌
    float curvedY = st.y + 0.4 - curve;
    
    // curvedY 값을 0.0 ~ 1.0 범위로 제한
    float t = clamp(curvedY, 0.0, 1.0);
    
    // 두 가지 색상 집합 정의
    vec3 colorA  = vec3(0.2196, 0.6471, 0.9529);
    vec3 colorB  = vec3(0.4706, 0.8824, 0.9961);
    
    vec3 colorA2 = vec3(0.0706, 0.1882, 0.7686);
    vec3 colorB2 = vec3(0.1961, 0.6157, 0.9608);
    
    // 마우스 y좌표에 따른 보간 계수 계산 (0: 맨 아래, 1: 맨 위)
    float mouseT = u_mouse.y / u_resolution.y;
    
    // 마우스 위치에 따라 두 색상 집합을 선형 보간
    vec3 finalColorA = mix(colorA2, colorA, mouseT);
    vec3 finalColorB = mix(colorB2, colorB, mouseT);
    
    // curvedY 값을 기반으로 최종 색상 보간 (세로 방향 그라데이션)
    vec3 color = mix(finalColorA, finalColorB, t);
    
    FragColor = vec4(color, 1.0);
}
