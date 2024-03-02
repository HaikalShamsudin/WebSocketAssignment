package com.Haikal.websocketassignment;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter(AccessLevel.PROTECTED)
@Component
@ServerEndpoint(value = "/chat/{username}")
public class ChatWebSocketEndpoint {

	@OnOpen
	public void onOpen(Session session, @PathParam("username") String username) throws IOException, EncodeException {
		log.info("Client connected: " + username );

	}

	@OnMessage
	public void onMessage(Session session, String message, @PathParam("username") String username) throws IOException, EncodeException {
		log.info("Message from " + username + ":" + message);
        try {
            session.getBasicRemote().sendText(username + ":" + message);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}

	@OnClose
	public void onClose(Session session, @PathParam("username") String username) throws IOException, EncodeException {
	
		log.info("Connection closed by :" + username);
	}

	@OnError
	public void onError(Session session, Throwable throwable) {

		throwable.printStackTrace();
	}

}

