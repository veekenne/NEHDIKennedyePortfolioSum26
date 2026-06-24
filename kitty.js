// 🐱🎉 A cute little party kitty, drawn + animated with p5.js (instance mode
// so it doesn't stomp on the globals in script.js).

const kittySketch = (p) => {
  const W = 170, H = 200;
  let t = 0;          // master clock
  let blink = 0;      // 0 = eyes open, 1 = fully shut
  let nextBlink = 90; // frames until next blink
  let happy = 0;      // boosted when clicked → bigger smile + bounce

  p.setup = () => {
    const c = p.createCanvas(W, H);
    c.parent('kitty-canvas');
    p.angleMode(p.RADIANS);
    // a little click delight
    c.mousePressed(() => { happy = 1; });
  };

  p.draw = () => {
    p.clear();
    t += 0.05;
    happy = Math.max(0, happy - 0.02);

    // gentle idle bob, exaggerated briefly on click
    const bob = Math.sin(t) * 4 - happy * 14;

    // blink timing
    if (--nextBlink <= 0) {
      blink = Math.min(1, blink + 0.25);
      if (blink >= 1) { nextBlink = 80 + Math.floor(p.random(80)); }
    } else if (blink > 0 && nextBlink > 6) {
      blink = Math.max(0, blink - 0.34);
    }

    p.push();
    p.translate(W / 2, H / 2 + 18 + bob);
    p.noStroke();

    drawTail();
    drawBody();
    drawHead();
    drawPartyHat();
    p.pop();
  };

  const FUR = '#FFFFFF';
  const FUR_SHADE = '#FFE3F3';
  const PINK = '#FF3FA4';
  const PINK_DK = '#D6177E';
  const VIOLET = '#7B5CFF';

  function drawTail() {
    const wag = Math.sin(t * 1.4) * 0.35;
    p.push();
    p.translate(34, 40);
    p.rotate(wag);
    p.fill(FUR);
    p.stroke(FUR);
    p.strokeWeight(13);
    p.noFill();
    p.beginShape();
    p.vertex(0, 0);
    p.bezierVertex(34, 8, 44, -22, 28, -46);
    p.endShape();
    p.noStroke();
    // pink tip
    p.fill(PINK);
    p.circle(28, -46, 14);
    p.pop();
  }

  function drawBody() {
    p.fill(FUR_SHADE);
    p.ellipse(0, 56, 84, 70);          // soft shadow body
    p.fill(FUR);
    p.ellipse(0, 52, 80, 66);
    // little paws
    p.ellipse(-20, 80, 22, 16);
    p.ellipse(20, 80, 22, 16);
    p.fill(PINK);
    p.ellipse(-20, 82, 8, 5);
    p.ellipse(20, 82, 8, 5);
  }

  function drawHead() {
    // ears
    p.fill(FUR);
    p.triangle(-40, -22, -20, -54, -10, -26);
    p.triangle(40, -22, 20, -54, 10, -26);
    p.fill(PINK);
    p.triangle(-32, -26, -22, -46, -16, -28);
    p.triangle(32, -26, 22, -46, 16, -28);

    // face
    p.fill(FUR);
    p.circle(0, 0, 76);

    // blush
    p.fill(255, 145, 200, 150);
    p.ellipse(-24, 10, 18, 11);
    p.ellipse(24, 10, 18, 11);

    // eyes (blink by squishing height)
    const eh = p.lerp(13, 1.5, blink);
    p.fill('#4A1942');
    p.ellipse(-15, -2, 11, eh);
    p.ellipse(15, -2, 11, eh);
    if (blink < 0.5) {                 // sparkle highlights
      p.fill(255);
      p.circle(-12, -5, 4);
      p.circle(18, -5, 4);
    }

    // nose
    p.fill(PINK_DK);
    p.triangle(-5, 8, 5, 8, 0, 14);

    // smile (grows a touch when happy)
    p.noFill();
    p.stroke(PINK_DK);
    p.strokeWeight(2.5);
    const sm = 6 + happy * 5;
    p.arc(-6, 14, 12, sm, 0, p.PI);
    p.arc(6, 14, 12, sm, 0, p.PI);
    p.noStroke();

    // whiskers
    p.stroke(255, 180, 220);
    p.strokeWeight(1.5);
    p.line(-18, 8, -42, 2);
    p.line(-18, 13, -42, 16);
    p.line(18, 8, 42, 2);
    p.line(18, 13, 42, 16);
    p.noStroke();
  }

  function drawPartyHat() {
    p.push();
    p.translate(2, -44);
    p.rotate(0.18 + Math.sin(t) * 0.02);   // jaunty tilt + tiny sway
    // cone
    p.fill(VIOLET);
    p.triangle(-24, 8, 24, 8, 0, -56);
    // candy stripes
    p.fill(PINK);
    p.push();
    p.beginShape();
    p.vertex(-24, 8); p.vertex(-12, 8); p.vertex(-4, -22); p.vertex(-12, -22);
    p.endShape(p.CLOSE);
    p.beginShape();
    p.vertex(4, 8); p.vertex(16, 8); p.vertex(10, -22); p.vertex(2, -22);
    p.endShape(p.CLOSE);
    p.pop();
    // brim
    p.fill(FUR_SHADE);
    p.ellipse(0, 8, 52, 12);
    // pom-pom that wiggles
    p.fill('#FFD600');
    const px = Math.sin(t * 2) * 3;
    p.circle(px, -58, 14);
  }
};

new p5(kittySketch);
