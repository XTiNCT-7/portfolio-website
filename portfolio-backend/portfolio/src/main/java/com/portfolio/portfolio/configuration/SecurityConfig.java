package com.portfolio.portfolio.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf->csrf.disable()) // Disable CSRF for simplicity (enable in production with proper config)
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/h2-console/**").permitAll()
                .anyRequest().permitAll() // Allow unrestricted access to all endpoints
            )
            .formLogin(form->form.disable()) // Disable the default login form
            .headers(headers -> headers
                .frameOptions(frame->frame.sameOrigin()) // Allow embedding within the same origin
            );
        return http.build();
    }
}
