import { TArticle, TSubject } from "../Types/types";

const params = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
}

const url = import.meta.env.API_KEY && `${import.meta.env.BASE_URL}${import.meta.env.API_KEY}&q=` || 'http://localhost:3000';

async function getNews(subject: string) {
    const allNews = await fetch(`${url}/${subject}`, params).then(response => response.json()).catch(error => console.log(error));
    return allNews.map((item: TArticle) => ({
        id: window.btoa(encodeURIComponent(item.title.slice(0, 9))),
        ...item
    }))
}

async function getNewsById(subject: TSubject, id: string) {
    const allNews = await fetch(`${url}/${subject}`, params).then(response => response.json()).catch(error => console.log(error));
    return allNews.map((item: TArticle) => ({
        id: window.btoa(encodeURIComponent(item.title.slice(0, 9))),
        ...item
    })).find((item: TArticle) => item.id === id)
}

export default {
    getNews,
    getNewsById
}