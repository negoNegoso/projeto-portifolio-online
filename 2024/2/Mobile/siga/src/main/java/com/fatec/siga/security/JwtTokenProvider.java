package com.fatec.siga.security;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;



import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {




        @Value("${app.jwt-secret}")
        private String jwtSecret;

        @Value("${app-jwt-expiration-milliseconds}")
        private long jwtExpirationDate;

        // generate JWT token
        public String generateToken(Authentication authentication){
            String username = authentication.getName();

            Date currentDate = new Date();

            Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

            String token = Jwts.builder()
                    .setSubject(username)
                    .setIssuedAt(new Date())
                    .setExpiration(expireDate)
                    .signWith(key())
                    .compact();
            return token;
        }

        private Key key(){
            return Keys.hmacShaKeyFor(
                    Decoders.BASE64.decode(jwtSecret)
            );
        }

        // get username from Jwt token
        public String getUsername(String token){
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            String username = claims.getSubject();
            return username;
        }

        public boolean validateToken(String token){
            try {
                Jwts.parserBuilder()
                        .setSigningKey(key())
                        .build()
                        .parse(token);
                return true;
            }catch(MalformedJwtException e){
                throw new BadCredentialsException("Invalid token");
            }catch (ExpiredJwtException e){
                throw new BadCredentialsException("Expired token");
            }catch (UnsupportedJwtException e){
                throw new BadCredentialsException("Unsupported token");
            }catch (IllegalArgumentException e){
                throw new BadCredentialsException("JWT claim string is empty");
            }

        }

}
