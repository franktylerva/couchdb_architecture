package com.example.apigateway;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.Base64;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.CLIENT_RESPONSE_ATTR;

@Component
@Slf4j
public class SetUserCookie extends AbstractGatewayFilterFactory {

    private static final Gson gson = new Gson();
    private static final String COOKIE_NAME = "USER-DATA";

    public GatewayFilter apply() {
        return apply((Object) null);
    }

    @Override
    public GatewayFilter apply(Object config) {
        return new GatewayFilter() {
            @Override
            public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

                log.debug("Client Response: " + exchange.getAttribute(CLIENT_RESPONSE_ATTR));

                return exchange.getPrincipal()
                        .flatMap(SetUserCookie::getResponseCookie)
                        .doOnNext(cookie -> exchange.getResponse().addCookie(cookie))
                        .map(cookie -> exchange)
                        .defaultIfEmpty(exchange).flatMap(chain::filter);
            }
        };
    }

    private static Mono<ResponseCookie> getResponseCookie(final Principal userInfoPrincipal) {

        log.debug("User: " + userInfoPrincipal.getName() );

        return Mono.just(userInfoPrincipal.getName())
//                .map(String::getBytes)
//                .map(bytes -> Base64.getEncoder().withoutPadding().encodeToString(bytes))
                .map(value -> ResponseCookie.from(COOKIE_NAME, value).path("/app").httpOnly(false).secure(false).build());
    }
}
