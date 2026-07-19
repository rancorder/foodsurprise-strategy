const fs=require('fs');
const BASECSS=fs.readFileSync('css.txt','utf8');
const APPJS=fs.readFileSync('app.txt','utf8');
const HERO=fs.readFileSync('hero_b64.txt','utf8').trim();

const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const head=(k,t,acc)=>`<div class="kick" style="color:${acc}">${esc(k)}</div><h1 class="ttl">${t}</h1>`;
const foot=n=>`<div class="foot"><span>株式会社フードサプライズ</span><span>${n} / 19</span></div>`;
const btn=(label,to,cls='')=>`<button class="navb ${cls}" data-goto="${to}">${esc(label)}</button>`;

/* target palettes */
const TG={
  kaigo:{name:'介護施設', c:'#2F7A6B', t:'#E7F1EF',
    icon:`<path d="M24 39C15 33 9 27 9 20c0-4 3-7 7-7 3 0 5 1.6 8 5 3-3.4 5-5 8-5 4 0 7 3 7 7 0 7-6 13-15 19z" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/>`},
  hoiku:{name:'保育園', c:'#E08A2B', t:'#FBF1E1',
    icon:`<circle cx="24" cy="24" r="9" fill="none" stroke="#fff" stroke-width="2.6"/><path d="M24 6v5M24 37v5M6 24h5M37 24h5M11 11l3.5 3.5M33.5 33.5L37 37M37 11l-3.5 3.5M14.5 33.5L11 37" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`}
};

/* ---------- templates ---------- */
function cover(){
  return `<div class="s-cover">
    <div class="cov-l">
      <div class="cov-eyebrow">介護施設・保育園むけ ｜ 果物のサブスク</div>
      <h1 class="cov-ttl">山形の旬を、<br>毎月の楽しみに。</h1>
      <p class="cov-sub">季節に応じた果物を、毎月1回・13か月お届け。<br>働く方にも、暮らす方にも、季節の楽しみを施設全体へ。</p>
      <div class="cov-chips"><span>職員の福利厚生</span><span>入居者・園児へ</span><span>ご家族の贈り物</span><span>1名から</span></div>
    </div>
    <div class="cov-r" style="background-image:url('data:image/jpeg;base64,${HERO}')"><div class="cov-r-fade"></div></div>
    <div class="cov-foot">株式会社フードサプライズ</div>
  </div>`;
}
function company(n){
  return `<div class="pad">${head('COMPANY ｜ ご挨拶と本日の趣旨','山形から、毎月の“旬”を施設へ','#B5852E')}
  <div class="two" style="margin-top:34px">
    <div class="panel-soft">
      <div class="ph">私たちについて</div>
      <p class="pp">山形は四季を通じて果物が豊富な“果樹王国”。<br>地元農家とのネットワークを大切にし、旬の果物を産地から直接お届けしています。近年は、介護施設・保育園さまからのご相談が増えています。</p>
    </div>
    <div class="panel-navy">
      <div class="ph gold">本日の趣旨</div>
      <p class="pp light">押し売りのお話ではありません。<br><b>毎月の旬の果物を、御施設のどなたに・どう楽しんでいただけそうか</b>を、一緒に整理させてください。</p>
    </div>
  </div>${foot(n)}</div>`;
}
function concept(n){
  const m=[['6月','さくらんぼ','#C8432B'],['8月','桃・メロン','#3C7A4E'],['10月','柿','#B5852E'],['11月','ラ・フランス','#1C5E6B'],['12月','サンふじ','#9C3B5A']];
  return `<div class="pad">${head('SERVICE ｜ サービスの核','季節に応じた果物を、13か月お届け','#3C7A4E')}
  <p class="lead" style="margin-top:18px">毎月1回、その時期に一番おいしい山形の旬が届きます。<b>「今月は何かな」</b>という、毎月の小さな楽しみが続きます。</p>
  <div class="tl" style="margin-top:52px">
    <div class="tl-line"></div>
    ${m.map(([mo,f,c])=>`<div class="tl-node"><div class="tl-dot" style="background:${c}"></div><div class="tl-mo">${mo}</div><div class="tl-f">${f}</div></div>`).join('')}
  </div>
  <p class="note-c" style="margin-top:48px">配送の月・回数・内容量は、御施設のご希望に合わせて調整できます。</p>${foot(n)}</div>`;
}
function hub(n){
  const cards=[['kaigo',5],['hoiku',9]].map(([k,to])=>{const d=TG[k];return `<button class="hubcard hubcard2" data-goto="${to}" style="--ic:${d.c};--it:${d.t}">
    <span class="hub-ic"><svg viewBox="0 0 48 48">${d.icon.replace(/#fff/g,d.c)}</svg></span>
    <span class="hub-name">${d.name}</span>
    <span class="hub-sub">${k==='kaigo'?'職員・入居者・ご家族へ':'保育士・園児・行事へ'}</span>
    <span class="hub-go">この施設向けに見る →</span></button>`;}).join('');
  return `<div class="pad">${head('MENU ｜ 施設の種類をお選びください','どちらの施設向けにご覧になりますか','#C8432B')}
  <div class="hubgrid hubgrid2" style="margin-top:30px">${cards}</div>
  <div class="hub-foot-row">${btn('共通プラン・料金を見る',13,'ghost')}${btn('確認事項を見る',19,'ghost')}</div>${foot(n)}</div>`;
}
function overview(k,n,items){
  const d=TG[k];
  return `<div class="band" style="background:${d.c}">
    <div class="band-kick">${d.name}むけ ｜ 3つの届け先</div>
    <div class="band-name">${d.name}で、こう活きます</div>
    <span class="band-ic"><svg viewBox="0 0 48 48">${d.icon}</svg></span>
  </div>
  <div class="pad pad-band">
    <div class="grid3" style="--ic:${d.c};--it:${d.t}">
      ${items.map(([h,b],i)=>`<div class="ocard" style="--ic:${d.c};--it:${d.t}"><div class="on">${i+1}</div><div class="oh">${h}</div><div class="ob">${b}</div></div>`).join('')}
    </div>
    <div class="band-navrow">${btn('◀ メニュー',4,'flat')}</div>
  </div>${foot(n)}`;
}
function benef(k,n,kicker,title,statement,points){
  const d=TG[k];
  return `<div class="pad">${head(d.name+' ｜ '+kicker,title,d.c)}
  <div class="benef" style="--ic:${d.c};--it:${d.t}">
    <div class="benef-state"><div class="bs-h">${statement}</div></div>
    <div class="benef-points">
      ${points.map(p=>`<div class="bp"><span class="bpi">●</span><span>${p}</span></div>`).join('')}
    </div>
  </div>${foot(n)}</div>`;
}
function sectionEnd(k){const d=TG[k];return `<div class="dnav">${btn('◀ メニュー',4,'flat')}${btn('共通プランへ ▶',13)}</div>`;}
function plan(n){
  const cards=[['1名から申込OK','施設単位の契約でなくても、入居者・職員おひとりから始められます。'],['13か月お届け','毎月1回、季節に合わせて旬の果物が届きます。'],['開始月は自由','4月でも9月でも、御施設の好きな月からスタートできます。']];
  return `<div class="pad">${head('PLAN ｜ 始めやすさ','1名から始められる、13か月プラン','#3C7A4E')}
  <p class="lead" style="margin-top:18px">「まず少人数で試したい」でも大丈夫。<b>おひとりからでも、施設全体でも</b>、始め方は選べます。</p>
  <div class="grid3" style="margin-top:32px">
    ${cards.map(([h,b])=>`<div class="plcard"><div class="plh">${h}</div><div class="plb">${b}</div></div>`).join('')}
  </div>
  <p class="note-c" style="margin-top:30px">まずはサンプルのご用意も相談できます。「食べてみてから」も可能です。</p>${foot(n)}</div>`;
}
function pricing(n){
  return `<div class="pad">${head('PRICING ｜ 2つのプラン','3,500円／6,000円の2プラン','#C8432B')}
  <div class="price" style="margin-top:26px">
    <div class="pc pc-navy">
      <div class="pc-badge">ボリューム</div>
      <div class="pc-name gold">プレミアム</div>
      <div class="pc-amt"><b>6,000</b><span class="pc-unit">円</span></div>
      <div class="pc-per light">/ 名・月（税別）</div>
      <p class="pc-desc light">特選の旬果物をたっぷり。満足度を重視したプラン。</p>
    </div>
    <div class="pc pc-paper">
      <div class="pc-name verm">スタンダード</div>
      <div class="pc-amt dark"><b>3,500</b><span class="pc-unit">円</span></div>
      <div class="pc-per mute">/ 名・月（税別）</div>
      <p class="pc-desc">季節の果物を手軽に。続けやすいプラン。</p>
    </div>
    <div class="pc pc-tint">
      <div class="pc-name verm">どちらも 13か月お届け</div>
      <p class="pc-mix">毎月1回、旬の果物をお届け。<br><b>内容量・品種・配送月</b>は相談して調整できます。</p>
      <p class="pc-mix2">利用人数は1名から。施設全体でのご利用も可能です。</p>
    </div>
  </div>
  <div class="price-note"><span class="pn-h">料金について</span><span class="pn-b">表示は1名あたり・1か月あたりの税別金額です。クール便の送料やお支払い方法の詳細は、次回までに確認のうえご案内します。</span></div>
  ${btn('◀ メニュー',4,'flat corner')}${foot(n)}</div>`;
}
function flex(n){
  return `<div class="pad">${head('FLEXIBILITY ｜ 柔軟な対応','果物の好み・内容の変更も相談できます','#3C7A4E')}
  <div class="two" style="margin-top:26px">
    <div class="panel-soft">
      <div class="ph">できること</div>
      <ul class="notelist" style="margin-top:4px">
        <li>食べられない果物は、別の果物への変更を相談できます</li>
        <li>その月の旬に合わせて内容が決まります</li>
        <li>果物以外（お米・トマト 等）も、時期により対応できる場合があります</li>
        <li>アレルギー・苦手への配慮もご相談ください</li>
      </ul>
    </div>
    <div class="panel-tint">
      <div class="ph verm">たとえば</div>
      <p class="pp" style="font-size:17px">「スイカは食べにくい」<br>→ <b>ブルーベリーに変更</b>、など。</p>
      <p class="pp" style="margin-top:14px;color:var(--inkSoft)">入居者・園児それぞれの事情に合わせて、無理なく続けられる形にできます。</p>
    </div>
  </div>${foot(n)}</div>`;
}
function delivery(n){
  const specs=[['お届け先','施設あてに、まとめて一括配送'],['梱包','保冷箱（発泡スチロール等）でお届け'],['鮮度','クール便で鮮度を保って配送'],['のし・メッセージ','ご希望に応じて相談可']];
  return `<div class="pad">${head('DELIVERY ｜ 配送','施設宛てに、まとめて配送できます','#1C5E6B')}
  <div class="two" style="margin-top:26px">
    <div><div class="ph">配送について</div>
      <div class="speclist">${specs.map(([a,b])=>`<div class="spec"><span class="spec-a">${a}</span><span class="spec-b">${b}</span></div>`).join('')}</div>
    </div>
    <div class="panel-navy">
      <div class="ph gold">届いたあとは、施設の自由に</div>
      <p class="pp light" style="font-size:17px">箱で届いた果物を、<b>職員・入居者・園児でどう分けるかは、御施設で自由に</b>決められます。</p>
      <p class="pp light" style="margin-top:14px;color:#c9d2df">「職員だけ」「入居者も一緒に」など、運用に合わせて分けられるため、不公平になりにくいのが特長です。</p>
    </div>
  </div>${foot(n)}</div>`;
}
function conditions(n){
  const you=['利用人数（1名〜／施設全体）','対象（職員・入居者・園児・ご家族 など）','開始したい月'];
  const us=['クール便の送料の扱い','お支払い方法（前払い・月払い 等）','ご希望に応じたサンプルのご用意'];
  return `<div class="pad">${head('CHECK ｜ ご利用にあたって','利用人数・配送・支払条件の確認','#B5852E')}
  <p class="lead" style="margin-top:16px">導入に向けて、いくつか一緒に確認させてください。</p>
  <div class="two" style="margin-top:24px">
    <div class="panel-soft"><div class="ph">御施設で決めていただくこと</div>
      ${you.map((x,i)=>`<div class="cfitem"><span class="cfnum">${i+1}</span><span>${x}</span></div>`).join('')}
    </div>
    <div class="panel-tint"><div class="ph verm">当社が確認してご連絡すること</div>
      ${us.map((x,i)=>`<div class="cfitem"><span class="cfnum">${i+1}</span><span>${x}</span></div>`).join('')}
    </div>
  </div>${foot(n)}</div>`;
}
function closing(n){
  const rows=[['介護施設','職員の福利厚生 ／ 入居者の毎月の楽しみ ／ ご家族からの贈り物'],['保育園','保育士の福利厚生 ／ 園児の食育・おやつ ／ 行事・ご家庭向け']];
  return `<div class="pad pad-navy">${head('CLOSING ｜ 本日の整理','季節の楽しみを、施設全体へ','#E9CF9F')}
  <p class="lead" style="margin-top:22px;color:#dbe1ee">毎月届く山形の旬が、<b style="color:#fff">働く方・暮らす方・ご家族</b>それぞれの、毎月の楽しみになります。</p>
  <div class="clist" style="margin-top:26px">
    ${rows.map(([a,b])=>`<div class="crow"><span class="ctag">${a}</span><span class="cbody">${b}</span></div>`).join('')}
  </div>
  <div class="panel-white" style="margin-top:24px">
    <div class="closing-cta" style="border:0;padding:0;margin:0">→ まずは“どなたに・何名から”始めるかを、一緒に決めさせてください。</div>
  </div>${foot(n)}</div>`;
}
function confirm(n){
  const you=[['利用人数と対象','職員・入居者・園児など、誰に何名から'],['開始したい月','いつからスタートするか'],['プランの方向性','3,500円／6,000円のどちら中心か']];
  const us=[['クール便の送料','送料の扱いを確認しご連絡'],['お支払い方法','前払い・月払いなどの条件を確認'],['サンプル','ご希望に応じてご用意']];
  return `<div class="pad">${head('NEXT ｜ 次回ご相談まで','次回ご相談までの、確認事項','#3C7A4E')}
  <div class="two" style="margin-top:24px">
    <div><div class="ph">御施設側で ご検討いただくこと</div>
      ${you.map(([h,b],i)=>`<div class="nscard" style="margin-bottom:12px"><div class="ns-h" style="margin:0 0 4px">${i+1}. ${h}</div><div class="ns-b">${b}</div></div>`).join('')}
    </div>
    <div><div class="ph verm">当社が 確認してご連絡すること</div>
      ${us.map(([h,b],i)=>`<div class="nscard" style="margin-bottom:12px;border-left:4px solid var(--verm)"><div class="ns-h" style="margin:0 0 4px">${i+1}. ${h}</div><div class="ns-b">${b}</div></div>`).join('')}
    </div>
  </div>
  <div class="sched"><span class="sched-h">次回のご相談</span><span class="sched-b">これらをふまえて、御施設向けの具体的なプランをご用意します。日程をご相談させてください。</span></div>
  ${btn('◀ メニュー',4,'flat corner')}${foot(n)}</div>`;
}

/* ---------- notes (presenter, customer-safe) ---------- */
const NOTE={
1:"【表紙｜最初の30秒】\n名乗り＋一言。読み上げ例：『本日はお時間ありがとうございます。株式会社フードサプライズの〇〇です。山形の旬の果物を、毎月1回・13か月お届けするサービスをご案内します。介護施設・保育園さまでのご利用が増えています。』\n■つかみ：“毎月の楽しみ”というキーワードで、堅い提案にしない。\n→ 次は Slide 2。",
2:"【会社紹介・趣旨｜約40秒】\n『山形の農家ネットワークから旬を直接お届けしています。本日は、御施設のどなたに・どう楽しんでいただけそうかを一緒に整理させてください。』\n■相談型トーン。押し売りにしない。\n→ 次は Slide 3。",
3:"【サービスの核｜約45秒】\n『毎月1回、その時期の一番おいしい山形の果物が届きます。“今月は何かな”という毎月の楽しみが続きます。配送月・回数・量は御施設に合わせて調整できます。』\n■13か月＝実質1年強。契約は1年単位／開始月は自由（4月でも9月でも可）。\n※月数は12/13で最終確定を先方に確認する前提。スライドは13か月表記。\n→ 次は Slide 4（施設の種類を選ぶ）。",
4:"【分岐メニュー｜操作スライド】\n相手の施設に合わせてボタンで飛ぶ。介護施設→Slide5／保育園→Slide9。『まず料金から』ならSlide14、『少人数で始めたい』ならSlide13。\n■どちらも“職員／利用者（入居者・園児）／ご家族・行事”の3つの届け先で見せると分かりやすい。",
5:"【介護施設｜3つの届け先｜約30秒】\n『介護施設さまでは、大きく3つの使い方があります。働く職員の方、暮らす入居者の方、そしてご家族から入居者様への贈り物です。』\n→ 職員(6)→入居者(7)→ご家族(8)の順で。関心が強いものから触れてOK。メニューはSlide4。",
6:"【介護施設｜職員の方へ｜約45秒】\n『毎月届く果物が、休憩時間のちょっとした楽しみに。届いた後は施設で自由に分けられるので、“職員か否か”で不公平になりにくいのが好評です。』\n■以前の懸念（社員・非社員の不公平）は“分配自由”で解消できる点を必ず添える。",
7:"【介護施設｜入居者の方へ｜約45秒】\n『「今月はさくらんぼ」「来月は桃」。季節の果物が、毎月の会話やレクのきっかけになります。食べにくい果物は変更も相談できます。』\n■“季節を感じられる”“会話が生まれる”という情緒価値を前面に。",
8:"【介護施設｜ご家族からの贈り物｜約45秒】\n『離れて暮らすご家族に代わって、毎月旬をお届けする使い方も。会いに行けない月も季節を届けられます。1名から申込でき、のしも相談可です。』\n→ 次は共通プラン(Slide13)。メニューはSlide4。",
9:"【保育園｜3つの届け先｜約30秒】\n『保育園さまでは、保育士の方への福利厚生、園児の食育・おやつ、そして行事やご家庭向けの3つが考えられます。』\n→ 保育士(10)→園児(11)→行事(12)。メニューはSlide4。",
10:"【保育園｜保育士の方へ｜約40秒】\n『多忙な先生方の休憩の楽しみに。毎月続く福利厚生として。届いた後は園で自由に分けられます。少人数からでも始められます。』",
11:"【保育園｜園児の食育・おやつ｜約45秒】\n『「これは何の果物かな？」旬の果物が、食育と季節の学びのきっかけに。アレルギーや苦手は変更を相談できます。』\n■食育・季節の学びという価値を強調。安全面（アレルギー配慮）も触れる。",
12:"【保育園｜行事・ご家庭向け｜約40秒】\n『父母会や卒園記念、季節の行事の品としても。施設あてにまとめて届くので配りやすいです。』\n→ 次は共通プラン(Slide13)。メニューはSlide4。",
13:"【共通｜プラン・始めやすさ｜約45秒】\n『施設単位でなくても、入居者や職員おひとりから始められます。毎月1回・13か月、開始月も自由です。まずサンプルからでも大丈夫です。』\n■“1名からOK”は導入ハードルを下げる最重要ポイント。少数でも遠慮なくトスできる。\n→ 次は Slide14（料金）。",
14:"【共通｜料金｜約45秒】\n『プランは2つ。プレミアム6,000円、スタンダード3,500円、いずれも1名・1か月あたりの税別です。どちらも13か月お届けで、内容量や配送月は相談できます。』\n■価格は3,500円／6,000円が正（旧資料の3,000円は誤り）。\n■クール便送料の扱い・支払方法（前払い/月払い）は未確定→次回確認事項へ。\n→ 次は Slide15。",
15:"【共通｜柔軟な対応｜約40秒】\n『食べられない果物は別の果物に変更できます。果物以外（お米・トマト等）も時期により対応可能な場合があります。』\n■実例（スイカ→ブルーベリー等）を添えると伝わりやすい。",
16:"【共通｜配送｜約40秒】\n『施設あてにまとめて一括配送。保冷箱・クール便でお届けします。のしも相談可。届いた後の分け方は御施設の自由です。』\n■“分配自由＝不公平になりにくい”を再度添えると効く。",
17:"【共通｜ご利用の確認｜約40秒】\n『導入に向けて、利用人数・対象・開始月を御施設側で、送料や支払方法は当社側で確認してご案内します。』\n■ネガはサラッと正直に。隠さない方が信頼になる。\n→ 次は Slide18（クロージング）。",
18:"【クロージング｜約40秒】\n『毎月の旬が、働く方・暮らす方・ご家族それぞれの楽しみになります。まずは“どなたに・何名から”始めるかを一緒に決めさせてください。』",
19:"【次回確認事項｜約40秒】\n御施設側＝人数・対象・開始月・プラン方向性。当社側＝送料・支払方法・サンプル。『次回、これらをふまえて御施設向けの具体プランをご用意します。』\n■未確定（送料・支払方法・月数12/13）は必ず持ち帰り、次回までに先方確認。"
};

/* ---------- assemble ---------- */
const SLIDES=[];let n=0;
const add=(kind,html)=>{n++;SLIDES.push({n,kind,html,note:NOTE[n]||''});};
add('cover',cover());
add('std',company(2));
add('std',concept(3));
add('hub',hub(4));
// 介護
add('ov',overview('kaigo',5,[['施設で働く職員の方へ','日々の癒し・福利厚生に'],['施設で暮らす入居者の方へ','季節を感じる毎月の楽しみに'],['ご家族から入居者様への贈り物にも','離れて暮らすご家族の想いを届ける']]));
add('benef',benef('kaigo',6,'職員の方へ','施設で働く職員の方へ','毎月届く旬の果物が、休憩時間の小さな楽しみに。多忙な現場への、続けやすい福利厚生。',['届いた果物は施設内で自由に分けられます','“職員か否か”で不公平になりにくい','毎月なので、続く楽しみになります'])+ '');
add('benef',benef('kaigo',7,'入居者の方へ','施設で暮らす入居者の方へ','「今月はさくらんぼ」「来月は桃」。季節の果物が、毎月の会話ときっかけを生みます。',['旬の果物で季節を感じられます','食べにくい果物は変更を相談できます','会話・レクリエーションのきっかけに']));
add('benefEnd',benef('kaigo',8,'ご家族の想い','ご家族から入居者様への贈り物にも','離れて暮らすご家族に代わって、毎月旬の果物をお届け。会いに行けない月も、季節を届けられます。',['ご家族が“毎月の贈り物”として使えます','1名から申し込めます','のし・メッセージも相談できます'])+sectionEnd('kaigo'));
// 保育
add('ov',overview('hoiku',9,[['園で働く保育士の方へ','福利厚生・日々のリフレッシュに'],['園児の食育・おやつに','旬の果物で季節を学ぶ'],['行事・ご家庭向けにも','父母会・記念の品として']]));
add('benef',benef('hoiku',10,'保育士の方へ','園で働く保育士の方へ','多忙な先生方へ、毎月届く季節の果物を福利厚生に。休憩のひとときの楽しみに。',['届いた果物は園内で自由に分けられます','少人数からでも始められます','毎月なので、続く楽しみになります']));
add('benef',benef('hoiku',11,'園児の食育','園児の食育・おやつに季節の果物','「これは何の果物かな？」旬の果物が、食育と季節の学びのきっかけになります。',['旬の果物で季節を感じる食育に','アレルギー・苦手は変更を相談できます','毎月の“おやつの楽しみ”に']));
add('benefEnd',benef('hoiku',12,'行事・ご家庭','行事・ご家庭向けにも','父母会や卒園記念、季節の行事の品として。ご家庭への“季節のおすそ分け”にも。',['行事・記念の品として使えます','施設あてにまとめて配送できます','のし・メッセージも相談できます'])+sectionEnd('hoiku'));
// 共通
add('std',plan(13));
add('std',pricing(14));
add('std',flex(15));
add('std',delivery(16));
add('std',conditions(17));
add('std',closing(18));
add('std',confirm(19));

/* ---------- presenter branch/quick ---------- */
const BRANCH=[
  {k:'介護施設のお客様', view:'職員・入居者・ご家族', to:5},
  {k:'保育園のお客様', view:'保育士・園児・行事', to:9},
  {k:'少人数で始めたい', view:'1名から/13か月プラン', to:13},
  {k:'まず料金を知りたい', view:'3,500円/6,000円', to:14},
  {k:'苦手な果物が心配', view:'変更・柔軟対応', to:15},
  {k:'条件を確認したい', view:'確認事項', to:[17,19]}
];
const QUICK=[['はじめに',1],['メニュー',4],['介護施設',5],['保育園',9],['プラン',13],['料金',14],['クロージング',18],['確認事項',19]];

/* ---------- extra CSS ---------- */
const EXTRA=`
.hubgrid2{grid-template-columns:1fr 1fr;gap:26px}
.hubcard2{padding:34px 32px;gap:12px}
.hubcard2 .hub-ic{width:58px;height:58px}
.hubcard2 .hub-ic svg{width:38px;height:38px}
.hubcard2 .hub-name{font-size:28px}
.hub-sub{font-size:15px;color:var(--inkSoft)}
.ocard{background:#fff;border:1px solid var(--line);border-top:5px solid var(--ic);border-radius:14px;padding:30px 26px}
.ocard .on{width:40px;height:40px;border-radius:50%;background:var(--it);color:var(--ic);font-family:'Noto Serif JP',serif;font-weight:700;font-size:19px;display:grid;place-items:center;margin-bottom:16px}
.ocard .oh{font-family:'Noto Serif JP',serif;font-weight:700;font-size:21px;color:var(--navy);line-height:1.4}
.ocard .ob{font-size:15px;color:var(--inkSoft);line-height:1.6;margin-top:12px}
.benef{display:grid;grid-template-columns:1.05fr 1fr;gap:30px}
.benef-state{background:var(--it);border-left:6px solid var(--ic);border-radius:16px;padding:38px 34px;display:flex;align-items:center}
.benef-state .bs-h{font-family:'Noto Serif JP',serif;font-weight:700;font-size:27px;color:var(--navy);line-height:1.6}
.benef-points{display:flex;flex-direction:column;gap:14px;justify-content:center}
.bp{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid var(--line);border-radius:12px;padding:18px 22px;font-size:16.5px;color:var(--ink);line-height:1.55}
.bp .bpi{color:var(--ic);font-size:13px;line-height:1.7;flex:none}
.plcard{background:#fff;border:1px solid var(--line);border-radius:14px;padding:32px 26px;text-align:center}
.plcard .plh{font-family:'Noto Serif JP',serif;font-weight:700;font-size:22px;color:var(--green)}
.plcard .plb{font-size:15px;color:var(--inkSoft);line-height:1.65;margin-top:14px}
.cfitem{font-size:16.5px;color:var(--ink);line-height:1.5;padding:14px 0;border-bottom:1px solid var(--line);display:flex;gap:14px}
.cfitem:last-child{border-bottom:0}
.cfnum{color:var(--verm);font-weight:700;flex:none}
.clist{display:flex;flex-direction:column;gap:14px}
.crow{display:flex;gap:18px;align-items:center;background:rgba(255,255,255,.06);border:1px solid #2a3a5c;border-radius:12px;padding:18px 24px}
.ctag{font-family:'Noto Serif JP',serif;font-weight:700;font-size:18px;color:var(--gold2);flex:none;width:96px}
.cbody{font-size:15.5px;color:#dbe1ee;line-height:1.5}
`;

// recompute presenter titles for THIS deck and inject into reused runtime
const TITLES=SLIDES.map(s=>{const m=s.html.match(/class="(?:ttl|cov-ttl|band-name)"[^>]*>([\s\S]*?)<\/(?:h1|div)>/);let t=m?m[1]:('Slide '+s.n);return t.replace(/<br>/g,' ').replace(/<[^>]+>/g,'').trim();});
const APP2=APPJS.replace(/const TITLES=\[[\s\S]*?\];/, 'const TITLES='+JSON.stringify(TITLES)+';');

const PAYLOAD=JSON.stringify({slides:SLIDES.map(s=>({n:s.n,kind:s.kind,html:s.html,note:s.note})),branch:BRANCH,quick:QUICK});
// APP has "/ 32" hardcoded in footer? no—footer built in html. But total shown in audience control uses S.length. Fine.
const HTML=`<!doctype html><html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>フードサプライズ｜介護施設・保育園むけ 商談スライド</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
<style>${BASECSS}${EXTRA}</style></head>
<body><div id="app"></div>
<script>const PAYLOAD=${PAYLOAD};</script>
<script>${APP2}</script>
</body></html>`;
fs.writeFileSync('/mnt/user-data/outputs/index.html',HTML);
console.log('slides:',SLIDES.length,'bytes:',HTML.length);
