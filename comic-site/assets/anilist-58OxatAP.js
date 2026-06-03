import{r as e}from"./rolldown-runtime-Cyuzqnbw.js";var t=e({browseAniList:()=>g,fetchAniListDetail:()=>_,fetchGenres:()=>v,fetchHighScore:()=>m,fetchPopular:()=>p,fetchTrending:()=>f,searchAniList:()=>h}),n=`https://graphql.anilist.co`,r=`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: MANGA, sort: TRENDING_DESC) {
        id idMal title { romaji english native }
        coverImage { large medium }
        averageScore popularity trending
        status genres
        description(asHtml: false)
        tags { name rank }
        staff { edges { role node { name { full } } } }
        startDate { year month day }
      }
    }
  }`,i=`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: MANGA, sort: POPULARITY_DESC) {
        id idMal title { romaji english native }
        coverImage { large medium }
        averageScore popularity trending
        status genres
        description(asHtml: false)
        tags { name rank }
        staff { edges { role node { name { full } } } }
        startDate { year month day }
      }
    }
  }`,a=`
  query ($page: Int, $perPage: Int, $minScore: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: MANGA, sort: SCORE_DESC, minimumTagRank: $minScore) {
        id idMal title { romaji english native }
        coverImage { large medium }
        averageScore popularity trending
        status genres
        description(asHtml: false)
        tags { name rank }
        staff { edges { role node { name { full } } } }
        startDate { year month day }
      }
    }
  }`,o=`
  query ($search: String, $page: Int, $perPage: Int, $genres: [String]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: MANGA, search: $search, genre_in: $genres) {
        id idMal title { romaji english native }
        coverImage { large medium }
        averageScore popularity trending
        status genres
        description(asHtml: false)
        tags { name rank }
        staff { edges { role node { name { full } } } }
        startDate { year month day }
      }
    }
  }`,s=`
  query ($id: Int) {
    Media(id: $id, type: MANGA) {
      id idMal title { romaji english native userPreferred }
      coverImage { extraLarge large medium }
      averageScore popularity trending
      status genres
      description(asHtml: false)
      tags { name rank }
      staff { edges { role node { name { full } } } }
      startDate { year month day }
      chapters
      volumes
      bannerImage
    }
  }`;async function c(e,t){let r=await fetch(n,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:e,variables:t})});if(!r.ok)throw Error(`AniList error ${r.status}`);return(await r.json()).data}function l(e){return{title:e.english||e.romaji||e.native||``,titleNative:e.native||e.romaji||``}}var u={RELEASING:`ongoing`,FINISHED:`completed`,HIATUS:`hiatus`,CANCELLED:`cancelled`,NOT_YET_RELEASED:`ongoing`};function d(e){let{title:t,titleNative:n}=l(e.title);return{id:`al-${e.id}`,title:t,titleNative:n,coverUrl:e.coverImage?.large||e.coverImage?.medium||``,coverLarge:e.coverImage?.extraLarge||e.coverImage?.large||``,bannerUrl:e.bannerImage||``,averageScore:e.averageScore||0,popularity:e.popularity||0,trending:e.trending||0,status:u[e.status]||`ongoing`,genres:e.genres||[],tags:e.tags?.filter(e=>e.rank>=60).slice(0,10)||[],description:(e.description||``).slice(0,400),author:e.staff?.edges?.filter(e=>e.role===`Story & Art`||e.role===`Story`).map(e=>e.node.name.full).join(`, `)||``,year:e.startDate?.year,totalChapters:e.chapters||void 0,totalVolumes:e.volumes||void 0}}async function f(e=1,t=20){let n=await c(r,{page:e,perPage:t});return{results:n.Page.media.map(d),nextPage:n.Page.pageInfo.hasNextPage?e+1:null}}async function p(e=1,t=20){let n=await c(i,{page:e,perPage:t});return{results:n.Page.media.map(d),nextPage:n.Page.pageInfo.hasNextPage?e+1:null}}async function m(e=1,t=20){let n=await c(a,{page:e,perPage:t,minScore:70});return{results:n.Page.media.map(d),nextPage:n.Page.pageInfo.hasNextPage?e+1:null}}async function h(e,t=1,n=20){let r=await c(o,{search:e,page:t,perPage:n});return{results:r.Page.media.map(d),total:r.Page.pageInfo.total}}async function g(e=[],t=1,n=20){let r={page:t,perPage:n};e.length>0&&(r.genres=e);let i=await c(o,{search:void 0,page:t,perPage:n,genres:e.length>0?e:void 0});return{results:i.Page.media.map(d),total:i.Page.pageInfo.total}}async function _(e){let t=await c(s,{id:e});return t.Media?d(t.Media):null}async function v(){return[`Action`,`Adventure`,`Comedy`,`Drama`,`Fantasy`,`Horror`,`Mecha`,`Mystery`,`Psychological`,`Romance`,`Sci-Fi`,`Slice of Life`,`Sports`,`Supernatural`,`Thriller`,`Historical`,`Isekai`]}export{m as a,h as c,v as i,g as n,p as o,_ as r,f as s,t};