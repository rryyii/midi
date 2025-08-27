package com.yiran.mdi.service;

import com.api.igdb.apicalypse.APICalypse;
import com.api.igdb.apicalypse.Sort;
import com.api.igdb.exceptions.RequestException;
import com.api.igdb.request.IGDBWrapper;
import com.api.igdb.request.JsonRequestKt;
import com.api.igdb.request.TwitchAuthenticator;
import com.api.igdb.utils.ImageBuilderKt;
import com.api.igdb.utils.ImageSize;
import com.api.igdb.utils.ImageType;
import com.api.igdb.utils.TwitchToken;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.yiran.mdi.model.Game;
import com.yiran.mdi.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class IGDBService {

    private static final Logger logger = LoggerFactory.getLogger(IGDBService.class);
    private final GameRepository repository;
    private final String client_id = System.getenv("client_id");
    private final String client_secret = System.getenv("client_secret");


    public IGDBService(GameRepository repository) {
        this.repository = repository;
    }

    private TwitchToken getToken() {
        logger.debug("Getting TwitchToken.");
        if (client_id.isEmpty() || client_secret.isEmpty()) {
            logger.warn("Failed to retrieve client id and client secret.");
            return null;
        }
        TwitchAuthenticator auth = TwitchAuthenticator.INSTANCE;
        return auth.requestTwitchToken(client_id, client_secret);
    }

    private String buildImage(String image_id) {
        return ImageBuilderKt.imageBuilder(image_id, ImageSize.LOGO_MEDIUM, ImageType.PNG);
    }

    private IGDBWrapper getWrapper() {
        IGDBWrapper wrapper = IGDBWrapper.INSTANCE;
        wrapper.setCredentials(client_id, getToken().getAccess_token());
        return wrapper;
    }

    public List<Game> getGames() {
        IGDBWrapper wrapper = getWrapper();
        APICalypse apicalypse = new APICalypse()
                .fields("id,name,genres.name,total_rating,total_rating_count,first_release_date,summary,cover.url,platforms.name")
                .sort("total_rating_count", Sort.DESCENDING)
                .where("total_rating >= 85")
                .limit(25);
        try {
            String result = JsonRequestKt.jsonGames(wrapper, apicalypse);
            Gson gson = new Gson();
            Type gameListType = new TypeToken<List<Game>>() {}.getType();
            List<Game> gameResult = gson.fromJson(result, gameListType);

            Set<Long> existingIds = repository.findAll().stream()
                    .map(Game::getId)
                    .collect(Collectors.toSet());

            List<Game> newGames = gameResult.stream()
                    .filter(game -> !existingIds.contains(game.getId()))
                    .collect(Collectors.toList());

            repository.saveAll(newGames);
            return repository.findAll();
        } catch (RequestException rqe) {
            logger.error(rqe.getMessage());
            return null;
        }
    }


}
