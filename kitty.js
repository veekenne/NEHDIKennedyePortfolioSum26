// 🐱🎉 Lilo & Stitch — two party cats drawn + animated with p5.js
// (instance mode so it stays out of script.js's globals).

const kittySketch = (p) => {
  const W = 340, H = 210;
  let t = 0;

  // Per-cat look + state. Lilo: grey. Stitch: blue-eyed tabby.
  const cats = [
    {
      name: 'Lilo',
      x: W * 0.27,
      fur: '#B9B6C4', furShade: '#A7A3B5', earPink: '#FFB7DE',
      eye: '#3A2A4A', tabby: false,
      hatA: '#FF3FA4', hatB: '#FFD600', pom: '#7B5CFF',
      phase: 0, blink: 0, nextBlink: 70, happy: 0
    },
    {
      name: 'Stitch',
      x: W * 0.73,
      fur: '#7FA8C9', furShade: '#6B95B8', earPink: '#FFB7DE',
      eye: '#1C6FE0', tabby: true,
      hatA: '#7B5CFF', hatB: '#FF6FC2', pom: '#FFD600',
      phase: Math.PI, blink: 0, nextBlink: 110, happy: 0
    }
  ];

  p.setup = () => {
    const c = p.createCanvas(W, H);
    c.parent('kitty-canvas');
    p.angleMode(p.RADIANS);
    c.mousePressed(() => {
      // bounce whichever cat was clicked
      cats.forEach(cat => {
        if (Math.abs(p.mouseX - cat.x) < 60) cat.happy = 1;
      });
    });
  };

  p.draw = () => {
    p.clear();
    t += 0.05;
    cats.forEach(drawCat);
  };

  function drawCat(cat) {
    cat.happy = Math.max(0, cat.happy - 0.02);
    const localT = t + cat.phase;
    const bob = Math.sin(localT) * 4 - cat.happy * 14;

    // blink timing
    if (--cat.nextBlink <= 0) {
      cat.blink = Math.min(1, cat.blink + 0.25);
      if (cat.blink >= 1) cat.nextBlink = 80 + Math.floor(p.random(90));
    } else if (cat.blink > 0 && cat.nextBlink > 6) {
      cat.blink = Math.max(0, cat.blink - 0.34);
    }

    p.push();
    p.translate(cat.x, H / 2 + 14 + bob);
    p.noStroke();

    drawTail(cat, localT);
    drawBody(cat);
    drawHead(cat, localT);
    drawPartyHat(cat, localT);
    drawNameTag(cat, bob);
    p.pop();
  }

  function drawTail(cat, localT) {
    const wag = Math.sin(localT * 1.4) * 0.35;
    p.push();
    p.translate(34, 40);
    p.rotate(wag);
    p.stroke(cat.fur);
    p.strokeWeight(13);
    p.noFill();
    p.beginShape();
    p.vertex(0, 0);
    p.bezierVertex(34, 8, 44, -22, 28, -46);
    p.endShape();
    p.noStroke();
    p.fill(cat.earPink);
    p.circle(28, -46, 13);
    p.pop();
  }

  function drawBody(cat) {
    p.fill(cat.furShade);
    p.ellipse(0, 56, 84, 70);
    p.fill(cat.fur);
    p.ellipse(0, 52, 80, 66);
    // tabby belly stripes
    if (cat.tabby) {
      p.fill(cat.furShade);
      p.ellipse(-14, 44, 6, 18);
      p.ellipse(0, 42, 6, 20);
      p.ellipse(14, 44, 6, 18);
    }
    // paws
    p.fill(cat.fur);
    p.ellipse(-20, 80, 22, 16);
    p.ellipse(20, 80, 22, 16);
    p.fill(cat.earPink);
    p.ellipse(-20, 82, 8, 5);
    p.ellipse(20, 82, 8, 5);
  }

  function drawHead(cat, localT) {
    // ears
    p.fill(cat.fur);
    p.triangle(-40, -22, -20, -54, -10, -26);
    p.triangle(40, -22, 20, -54, 10, -26);
    p.fill(cat.earPink);
    p.triangle(-32, -26, -22, -46, -16, -28);
    p.triangle(32, -26, 22, -46, 16, -28);

    // face
    p.fill(cat.fur);
    p.circle(0, 0, 76);

    // tabby forehead + cheek stripes
    if (cat.tabby) {
      p.fill(cat.furShade);
      p.rect(-3, -34, 6, 12, 3);
      p.push();
      p.rotate(-0.4); p.rect(-16, -30, 5, 11, 3); p.pop();
      p.push();
      p.rotate(0.4); p.rect(11, -30, 5, 11, 3); p.pop();
      p.ellipse(-30, 2, 5, 14);
      p.ellipse(30, 2, 5, 14);
    }

    // blush
    p.fill(255, 145, 200, 150);
    p.ellipse(-24, 10, 18, 11);
    p.ellipse(24, 10, 18, 11);

    // eyes (blink squishes height); Stitch gets bright blue
    const eh = p.lerp(13, 1.5, cat.blink);
    p.fill(cat.eye);
    p.ellipse(-15, -2, 11, eh);
    p.ellipse(15, -2, 11, eh);
    if (cat.blink < 0.5) {
      p.fill(255);
      p.circle(-12, -5, 4);
      p.circle(18, -5, 4);
    }

    // nose
    p.fill('#D6177E');
    p.triangle(-5, 8, 5, 8, 0, 14);

    // smile
    p.noFill();
    p.stroke('#D6177E');
    p.strokeWeight(2.5);
    const sm = 6 + cat.happy * 5;
    p.arc(-6, 14, 12, sm, 0, p.PI);
    p.arc(6, 14, 12, sm, 0, p.PI);
    p.noStroke();

    // whiskers
    p.stroke(255, 255, 255, 200);
    p.strokeWeight(1.5);
    p.line(-18, 8, -42, 2);
    p.line(-18, 13, -42, 16);
    p.line(18, 8, 42, 2);
    p.line(18, 13, 42, 16);
    p.noStroke();
  }

  function drawPartyHat(cat, localT) {
    p.push();
    p.translate(2, -44);
    p.rotate(0.18 + Math.sin(localT) * 0.02);
    // cone
    p.fill(cat.hatA);
    p.triangle(-24, 8, 24, 8, 0, -56);
    // contrasting stripes
    p.fill(cat.hatB);
    p.beginShape();
    p.vertex(-24, 8); p.vertex(-12, 8); p.vertex(-4, -22); p.vertex(-12, -22);
    p.endShape(p.CLOSE);
    p.beginShape();
    p.vertex(4, 8); p.vertex(16, 8); p.vertex(10, -22); p.vertex(2, -22);
    p.endShape(p.CLOSE);
    // brim
    p.fill('#FFFFFF');
    p.ellipse(0, 8, 52, 12);
    // pom-pom wiggle
    p.fill(cat.pom);
    const px = Math.sin(localT * 2) * 3;
    p.circle(px, -58, 14);
    p.pop();
  }

  function drawNameTag(cat, bob) {
    p.push();
    // counter the body bob so the label sits steady-ish under each cat
    p.translate(0, 96 - bob * 0.5);
    p.textAlign(p.CENTER, p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(13);
    p.fill('#D6177E');
    p.text(cat.name, 0, 0);
    p.pop();
  }
};

new p5(kittySketch);
