(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f=[];let c=1;const l=8,i={cardsContainer:document.querySelector(".block-artist__list"),loadMoreBtn:document.querySelector(".block-artist-wrapper__button")};i.loadMoreBtn.classList.remove("hidden");async function d(o=1,s=l){const t=await fetch(`https://sound-wave.b.goit.study/api/artists?page=${o}&limit=${s}`);if(!t.ok)throw new Error("Error: "+t.status);return t.json()}function u(o,s){o.forEach(t=>{f.push(t._id);const n=t.genres.map(r=>`<span class="block-artist-list-item-wrapper-text__span">${r}</span>`).join(""),e=t.strBiographyEN.length>200?t.strBiographyEN.slice(0,200)+"...":t.strBiographyEN;s.insertAdjacentHTML("beforeend",`
      <li class="block-artist-list__item">
        <div class="block-artist-list-item__wrapper-icon">
          <img src="${t.strArtistThumb}" alt="${t.strArtist}" class="block-artist-list-wrapper__icon" width="672" height="432">
        </div>
        <div class="block-artist-list-item__wrapper-text">
          ${n}
        </div>
        <h2 class="block-artist-list-item__title">${t.strArtist}</h2>
        <p class="block-artist-list-item__paragraph">${e}</p>
        <button class="block-artist-list-item__button" data-id="${t._id}">
          Learn More <img src="/img/artist-section/arrow-right.svg" alt="arrow-right">
        </button>
      </li>
      `)})}async function p(o){o.target.blur(),c++;try{const{artists:s,totalArtists:t}=await d(c,l);u(s,i.cardsContainer);const n=i.cardsContainer.lastElementChild;await new Promise(a=>setTimeout(a,100));const e=n.getBoundingClientRect().height;window.scrollBy({top:e*1,behavior:"smooth"});const r=Math.ceil(t/l);c>=r&&(iziToast.info({title:"",message:"Ви, передивились всіх артистів.",position:"topRight",timeout:4e3,titleColor:"#fff",backgroundColor:"#764191",messageColor:"#fff"}),i.loadMoreBtn.classList.add("hidden"),i.loadMoreBtn.removeEventListener("click",p))}catch(s){console.error(s)}}(async()=>{try{const{artists:o,totalArtists:s}=await d(c,l);u(o,i.cardsContainer);const t=Math.ceil(s/l);c>=t?i.loadMoreBtn.classList.add("hidden"):i.loadMoreBtn.addEventListener("click",p)}catch(o){console.error(o)}})();
//# sourceMappingURL=index.js.map
