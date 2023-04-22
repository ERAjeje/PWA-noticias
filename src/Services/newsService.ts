const params = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
}

const url = import.meta.env.API_KEY && `${import.meta.env.BASE_URL}${import.meta.env.API_KEY}&q=` || 'http://localhost:3000';

function getNews(subject: string) {
    return fetch(`${url}/${subject}`, params).then(response => response.json()).catch(error => console.log(error))
}

function getNewsById(subject: string, id: string | number) {
    let allNews;
    fetch(`${url}/${subject}`, params).then(response => allNews = response.json()).catch(error => console.log(error))
    return allNews?.[id]
}

export default {
    getNews,
    getNewsById
}