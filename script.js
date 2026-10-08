const pages = document.querySelectorAll(".pages > *");
let grabs = false;
pages.forEach((page, i) => {
  if (i % 2 === 0) {
    page.style.zIndex = pages.length - i;
  }
});

window.addEventListener("load", () => {
  document.querySelectorAll(".page").forEach((page) => {
    page.addEventListener("click", () => {
      const pageIndex = Array.from(pages).indexOf(page) + 1;
      if (pageIndex % 2 === 0) {
        page.classList.remove("flipped");
        page.previousElementSibling?.classList.remove("flipped");
      } else {
        page.classList.add("flipped");
        page.nextElementSibling?.classList.add("flipped");
      }
      if (window.responsiveVoice) {
        responsiveVoice.cancel();
      }
    });
  });
  if (grabs) {
    document.querySelectorAll(".page").forEach((page) => {
      page.addEventListener("mousedown", (e) => {
        const pageIndex = Array.from(pages).indexOf(page) + 1;
        const pageWidth = page.offsetWidth;
        const pageLeft = page.offsetLeft;
        let grabbed = "";
        let otherPage, centerX, fromSpine, deg;
        if (pageIndex % 2 === 0) {
          grabbed = "verso";
          otherPage = page.previousElementSibling;
          centerX = pageLeft + pageWidth;
        } else {
          grabbed = "recto";
          otherPage = page.nextElementSibling;
          centerX = pageLeft;
        }
        const leaf = [page, otherPage].filter(Boolean);
        const updateRotation = (mouseX) => {
          fromSpine = mouseX - centerX;
          if (grabbed === "recto") {
            deg = 90 * -(1 - fromSpine / pageWidth);
            page.style.transform = `rotateY(${deg}deg)`;
            if (otherPage)
              otherPage.style.transform = `rotateY(${180 + deg}deg)`;
          } else {
            deg = 90 * (1 + fromSpine / pageWidth);
            page.style.transform = `rotateY(${deg}deg)`;
            if (otherPage)
              otherPage.style.transform = `rotateY(${deg - 180}deg)`;
          }
        };
        const mouseMoveHandler = (e) => {
          updateRotation(e.pageX);
        };
        const mouseUpHandler = () => {
          leaf.forEach((p) => {
            p.classList.remove("grabbing");
            p.style.transform = "";
          });
          window.removeEventListener("mousemove", mouseMoveHandler);
          window.removeEventListener("mouseup", mouseUpHandler);
        };
        updateRotation(e.pageX);
        leaf.forEach((p) => p.classList.add("grabbing"));
        window.addEventListener("mousemove", mouseMoveHandler);
        window.addEventListener("mouseup", mouseUpHandler);
      });
    });
  }
  document.querySelector(".book")?.classList.add("bound");
});

function adjustLayout() {
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const pages = document.querySelectorAll(".page");
  if (isSmallScreen) {
    pages.forEach((page) => {
      page.classList.remove("flipped");
    });
  }
}

window.addEventListener("load", adjustLayout);
window.addEventListener("resize", adjustLayout);

let utterance = null;

function starteVorlesen() {
  window.speechSynthesis.cancel();

  const text =
    "Seine Angelrute war Rotlümmels Mumpitz-Märchen, um  sich den ganzen Nachmittag auf die faule Haut legen zu können. Ausgestreckt auf dem Rücken liegend, die Hinterpfoten ins kühle Nass des Sees hängend hatte er sich die Sonne auf sein Fell scheinen lassen und seelenruhig vor sich hin geträumt. Nur ab und zu, wenn die Angelschnur, an seinem Zeh zerrte, drückte er die Augen auf und zog mit den Vorderpfoten rasch den Fisch an Land, der aus reiner Gier nach Regenwürmern angebissen hatte. Derweil flitzte seine Mama stundenlang mit dem Weidenkorb um den See und sammelte emsig Mäuse, Vogeleier, Käfer und Beeren für das Abendbrot ein. Als sich die Sonne mit einem letzten Blinzeln vom Tag verabschiedete, rief Mama Fuchs: Auf gehts. Es wird Zeit nach Hause zurückzukehren! Komm mein Junge! Doch Rotlümmel war gerade so schön am Dösen, dass er munter weiterschnarchte. Erst als ein kalter Wind durch sein Fell sauste, zuckte Rotlümmel zusammen. Doch nicht die Puste-Spur auf seinem Bauch lies ihn vor Schreck versteinern. Um ihn herum hatte sich der dunkle Nachthimmel ausgebreitet und neben der Sonne auch seine Mama verschlungen. Rotlümmels Herz pochte besorgt. Mama, wo bist du?, wimmerte der kleine Fuchs in die Dunkelheit. Er drehte seinen Kopf in alle Richtungen, doch alles schien ihm so fremd und bedrohlich. Voller Angst sprang er auf. Mama?, schrie er, so laut er konnte in die schwarze Nacht, doch es kam keine Antwort. Da ergriff ihn Panik. Er begann zu rennen. So schnell seine Beine ihn trugen preschte er zwischen den dicken Tannen durch den Wald. Doch dort war es noch viel finsterer und er verlor total die Orientierung.  Er wusste nicht mehr, wo der heimische Fuchsbau lag und wie er dorthin gelangen könnte. Mama!, jaulte er erneut auf. Doch niemand konnte ihn hören, denn in diesem Moment erhob sich ein lautes Donnergepolter vom Himmel. Erst krachte es hier, dann dort, dann überall. Rotlümmel sauste das blanke Entsetzten in die Glieder. Als wäre der Jäger hinter ihm her, flitze er durch das Gehölz. Dann schickte der Himmel Blitze auf die Erde. Es waren helle, weiß-gelbe Strahlen die voller Kraft zwischen den Bäumen zu explodieren schienen. Rotlümmel kreischte  panisch auf, doch im flackernden Licht erblickte er vor sich den Eingang eines Baus in der Erde. Um Haaresbreite, bevor der nächste Blitz einschlagen konnte, schob sich der kleine Fuchs durch die enge Öffnung in die Tiefe. Sein Atem ging noch immer raschelnd, doch zumindest drang das himmlische Treiben nicht in dieses unterirdische Gewölbe hinein und auch der Wolkentrommel klang nur noch wie ein leises Murmeln aus der Ferne. Rotlümmel schnüffelte. Er wusste nicht, was hier so seltsam roch, aber es roch nicht nach daheim. Kraftlos lies er sich auf die Erde fallen. Dann brachen die Tränen aus ihm heraus und tropften auf den trockenen Boden. Nur eine Biegung weiter im Erdloch zitterte Familie Wildkaninchen am ganzen Körper. Als sie den Fuchs in den Bau stürmen hörten, waren sie voller Entsetzen in den nächsten Gang gekrabbelt. Bei Füchsen waren sie immer vorsichtig. Es gab zwar Wusel, die mit Wildkaninchen ihren Bau teilten, doch wusste man selten im Voraus, ob der Meister Reinecke ein Flunkertopf war oder es ehrlich mit ihnen meinte. Hört ihr, wie der kleine Fuchs heult, flüsterte Mutti Mümmel mitleidend. Er hat sich verlaufen und vermisst seine Mama. Sicherlich braucht er Hilfe, nickte Opa Schlapp-Löffler. Ich glaube nicht, dass er uns etwas antun wird, so schlecht, wie es ihm geht. Ihr bleibt hier. Ich schaue alleine nach. Er knipste seine Taschenlampe an und schob sich vorsichtig zurück durch den Gang. Der helle Strahl fiel auf ein orangenes Häuflein Elend. Rotlümmel hatte die Vorderpfoten über die verheulten Augen gelegt, und sein Körper zuckte bei jedem Seufzer zusammen. Hallo kleiner Fuchs, begann Schlapp-Löffler. Du weinst dir ja die Seele aus dem Körper. Rotlümmel blinzelte auf, als er das grauhaarige Kaninchen sah. Du befindest dich in unserem Kaninchenbau. Hier bist du sicher. Das Gewitter da draußen kann dir hier nichts anhaben. Ich will nach Hause, schniefte Rotlümmel. Ich will zu meiner Mama! Ja, mein Kleiner, das glaube ich, beruhigte ihn Schlapp-Löffler, „aber solange der Himmel draußen noch mit sich selbst schimpft, solltest du noch unser Gast bleiben und dich ausruhen.“ Mit diesen Worten legte er seine weiche Wuschelpfote auf die Pfote des Fuchses. Aber meine Mama weiß nicht, wo ich bin, heulte Rotlümmel erneut los und eine dicke Träne rann aus seinem Auge. Deine Mama ist ein intelligenter Fuchs, klärte Schlapp-Löffler ihn auf. Sie spürt tief in sich, dass du an einem warmen Ort bist und dich mutig vor dem Unwetter gerettet hast. Ich bin selbst schuld, flüsterte Rotlümmel. Warum habe ich nicht auf meine Mama gehört? Sie hat extra gerufen, ich solle nach Hause kommen. Sie wird richtig böse auf mich sein und viel schimpfen, wenn sie mich sieht. Es kann schon sein, dass deine Mama erst einmal laut ausatmen wird, wenn sie dich sieht. Aber sie schimpft nicht, weil sie dich nicht mehr lieb hat. Soll ich dir verraten, warum sie schimpfen könnte? Rotlümmel nickte  mit offenem Mund. Sie schimpft, weil sie so ein riesiges Herz hat und sie so große Angst um dich, ihren wertvollsten Schatz hatte. Wirklich? Rotlümmel hob erleichtert den Kopf an. Ganz sicher. Wenn Eltern dich sehr, sehr lieb haben, dann drücken sie ihre Sorge manchmal durch lautes Schimpfen aus. Das ist wie bei einer Walnuss. Außen ist die Nuss verdammt hart, aber drinnen hat sie einen weichen Kern. Und das ist bei deiner Mama auch so. Morgen, wenn sie dich sieht, wird ihre Angst abfallen wie alter Putz von der Wand und dann wird sie dich an sich drücken und sagen, ich bin so froh, dass du wieder daheim bist. Der kleine Fuchs atmete auf. Er fühlte, dass alles gut werden würde. Ein tiefes Bu-huuuuuu tönte durch den Wald und auch die Tiere im Erdloch konnten es hören. Rotlümmel fing sofort an zu zittern, doch Schlapp-Löffler sprach mit sanfter Stimme weiter. Auch das ist nur ein Geschrei in der Ferne. Es ist nur ein Revierruf. Man hört diese Uhu-Rufe kilometerweit. Dieser Raubvogel weiß gar nicht, dass du uns heute besuchst. Er kennt noch nicht einmal unsere Anschrift, denn sonst würde er ganz andere Geräusche von sich geben. Glaub mir, ich weiß wovon ich spreche, denn Uhus futtern nicht nur kleine Füchse, sondern auch Kaninchen. Komm, lass dich einfach mal von mir drücken.  Damit öffnete Schlapp-Löffler seine Arme und Rotlümmel kuschelte sich wärmesuchend an ihn. Voller Geborgenheit schlief er erschöpft im weichen Fell ein. Als der kleine Fuchs am nächsten Morgen aufwachte roch es im Bau schon nach gedünstetem Fallobst, das Mutti Mümmel am Tag zuvor aus den Streuobstwiesen aufgesammelt hatte und das nun in frischem Fett in der Pfanne brutzelte. Für Rotlümmel war es das leckerste Vegetarier-Gericht, das er jemals gegessen hatte und das er voller Vergnügen verschlang.  Dann verabschiedete er sich von der gastfreundlichen Wildkaninchenfamilie und schob seine Nase wieder aus dem Erdhügelbau. Die Sonne erleuchtete bereits die Umgebung, so dass Rotlümmel den Feldweg über die Lichtung zum Fuchsbau sofort wiederfand. Voller Freude lief er seiner Mama entgegen, denn er wusste, dass er sich vor nichts mehr zu fürchten hatte. Er hatte den schrecklichen Donner, die erschütternden Blitze und die angsteinflößenden Rufe des Uhus überstanden und das Schimpfen der Mama würde ihm nichts mehr ausmachen, denn seine Mama liebte ihn über alles. Das hatte er dank Opa Schlapp-Löffler nun begriffen.";
  utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  const maleVoiceNames = [
    "Microsoft Stefan",
    "Microsoft Christoph",
    "Google deutsch",
    "Yannick",
    "Markus",
  ];

  let selectedVoice = voices.find(
    (voice) =>
      voice.lang.startsWith("de") &&
      maleVoiceNames.some((name) => voice.name.includes(name)),
  );

  if (!selectedVoice) {
    selectedVoice = voices.find((voice) => voice.lang.startsWith("de"));
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.pitch = 0.75;
  utterance.rate = 0.88;

  window.speechSynthesis.speak(utterance);
}

function stoppeVorlesen() {
  window.speechSynthesis.cancel();
}

if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () =>
    window.speechSynthesis.getVoices();
}
