import { games } from '@/models/games';
import { Game } from '@/models/types/game';
import { Pagina } from "@/lib/pagina";
import { config }  from "@/lib/config"

export const getRandomGame = async(): Promise<Game> => {
    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
};

export const getGames = (
    type?: string,
) => {
    let result: Game[] = [];
    if (type && type.trim() !== "") {
        // result = games.filter(game => type.toLocaleLowerCase() in game.type);
        if (result.length > 8) {
            result = result.slice(0, 8);
        }
    }
    return result;
};

export const getRelatedGames  = async  (
    related: string[]
) => {
    return games.filter(game => related.includes(game.title));
};


export const getMoreGames = (
    type: string,
) => {
    return games.filter(game => game.type.includes(type.toLocaleLowerCase()));
};

export const getRandomGames = () => {
    const minNum = 30;
    const maxNum = Math.min(32, 50); // 确保不超过 games 的长度
    const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum; 
    // 随机打乱 games 数组
    const shuffledGames = games.sort(() => Math.random() - 0.5);
    // 返回 random_num 个游戏
    return shuffledGames.slice(0, randomNum);
};

export const getGameByName = (
    name?: string,
): Game => {
    const game = games.find(game => game.name === name);
    if (!game) {
        return {} as Game;
    }
    return game;
};

export const getGameByTitle = (
    title?: string,
): {
    title: string;
    name: string;
    image: string;
}[] => {
    if (!title) {
        return [];
    }
    const gameArr = games.filter(game => game.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    if (!gameArr) {
        return [];
    }
    return gameArr.map(game => ({
        title: game.title,
        name: game.name,
        image: game.image,
    }));
};

export const getGamePagination = async (
    query?: string,
    page?: number,
    type?: string,
): Promise<{ games: Game[]; pagination: Pagina; error?: Error }> => {
    const limit = Number(config.limit)
    const currentPage = page === undefined || page === null ? 1 : Number(page)
    try {
        let result = query && query.trim() !== "" ? games.filter(game => 
            game.title.toLowerCase().includes(query.toLowerCase()) || game.type.includes(query.toLocaleLowerCase())) : games
        result = type && type.trim() !== "" ? result.filter(game => game.type.includes(type.toLocaleLowerCase())) : result
        const totalPages = Math.ceil(result.length / limit)
        const games_result = result.slice((currentPage) * limit - limit, (currentPage) * limit)
        const pagination: Pagina = {
            totalPages: totalPages,
            page: currentPage, 
            limit: limit,
            prevPage: currentPage > 1 ? currentPage - 1 : null,
            nextPage: currentPage < totalPages ? currentPage + 1 : null,
        }
        if (games_result.length === 0) {
            return { games: [], pagination };
        } else {
            // 将 logo_images 转换为 Logo[]
            const games: Game[] = games_result.map(game => {
                return {
                    // 填写与 Logo 结构对应的属性
                    name: game.name,
                    title: game.title, 
                    image: game.image, 
                    src: game.src, 
                    type: game.type, 
                } as Game;
            });
            return { games, pagination };
        }
    } catch (e) {
        const pagination: Pagina = {
            totalPages: 0,
            page: currentPage, 
            limit: limit,
            prevPage: null,
            nextPage: null,
        }
        if (e instanceof Error) return { error: e, games: [], pagination: pagination };
        return {
            games: [],
            pagination: pagination,
            error: { message: "Error, please try again." } as Error,
        };
    }
};