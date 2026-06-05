var e=`https://graphql.anilist.co`,t=`
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
  }`,n=`
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
  }`,r=`
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
  }`,i=`
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
  }`,a=`
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
  }`;async function o(t,n){let r=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:t,variables:n})});if(!r.ok)throw Error(`AniList error ${r.status}`);return(await r.json()).data}function s(e){return{title:e.english||e.romaji||e.native||``,titleNative:e.native||e.romaji||``}}var c={RELEASING:`ongoing`,FINISHED:`completed`,HIATUS:`hiatus`,CANCELLED:`cancelled`,NOT_YET_RELEASED:`ongoing`};function l(e){let{title:t,titleNative:n}=s(e.title);return{id:`al-${e.id}`,title:t,titleNative:n,coverUrl:e.coverImage?.large||e.coverImage?.medium||``,coverLarge:e.coverImage?.extraLarge||e.coverImage?.large||``,bannerUrl:e.bannerImage||``,averageScore:e.averageScore||0,popularity:e.popularity||0,trending:e.trending||0,status:c[e.status]||`ongoing`,genres:e.genres||[],tags:e.tags?.filter(e=>e.rank>=60).slice(0,10)||[],description:(e.description||``).slice(0,400),author:e.staff?.edges?.filter(e=>e.role===`Story & Art`||e.role===`Story`).map(e=>e.node.name.full).join(`, `)||``,year:e.startDate?.year,totalChapters:e.chapters||void 0,totalVolumes:e.volumes||void 0}}async function u(e=1,n=20){let r=await o(t,{page:e,perPage:n}),i=r.Page.pageInfo;return{results:r.Page.media.map(l),total:i.total,lastPage:i.lastPage,nextPage:i.hasNextPage?e+1:null}}async function d(e=1,t=20){let r=await o(n,{page:e,perPage:t}),i=r.Page.pageInfo;return{results:r.Page.media.map(l),total:i.total,lastPage:i.lastPage,nextPage:i.hasNextPage?e+1:null}}async function f(e=1,t=20){let n=await o(r,{page:e,perPage:t,minScore:70}),i=n.Page.pageInfo;return{results:n.Page.media.map(l),total:i.total,lastPage:i.lastPage,nextPage:i.hasNextPage?e+1:null}}async function p(e,t=1,n=20){let r=await o(i,{search:e,page:t,perPage:n});return{results:r.Page.media.map(l),total:r.Page.pageInfo.total}}async function m(e=[],t=1,n=20){let r={page:t,perPage:n};e.length>0&&(r.genres=e);let a=await o(i,{search:void 0,page:t,perPage:n,genres:e.length>0?e:void 0});return{results:a.Page.media.map(l),total:a.Page.pageInfo.total}}async function h(e){let t=await o(a,{id:e});return t.Media?l(t.Media):null}function g(e){return{id:e.id,title:e.title,titleAlt:e.titleNative||void 0,coverUrl:e.coverUrl,description:e.description||void 0,author:e.author||void 0,tags:e.tags?.map(e=>e.name)||[],status:e.status,updatedAt:new Date().toISOString(),rating:e.averageScore>0?e.averageScore/10:void 0,chapters:[]}}export{d as a,f as i,m as n,u as o,h as r,p as s,g as t};