(function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  //let ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = "40px serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  //let myText = document.getElementById("myText").value;
  //  .log(myText);

  let txt =
    "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. Lorem ipsum, or ";

  /**
   *
   * wrappedText = "It is a long e', making it look like readable English. Many desktop \n
   *    publishing packages and web page editors now use Lorem Ipsum as their default model text, \n"
   *
   *
   *
   *
   *
   */

  const paddingX = 50;
  const widthWithPadding = canvas.width - 2 * paddingX;
  const wrappedText = wrapText(ctx, txt, widthWithPadding);

  const lineHeight = 50;
  const splittenTexts = wrappedText.match(/.+(\n)/g);
  console.log(splittenTexts);
  if (splittenTexts && splittenTexts.length) {
    splittenTexts.forEach((x, i) => {
      ctx.fillText(
        x,
        canvas.width / 2,
        canvas.height / 2.5 + lineHeight * i,
        widthWithPadding
      );
    });
  } else {
    ctx.fillText(
      wrappedText,
      canvas.width / 2,
      canvas.height / 2,
      widthWithPadding
    );
  }
})();

function wrapText(canvas, text, maxWidth) {
  const textArray = text.split(" ");
  let paragraph = "";
  let newParagraph = null;

  textArray.forEach((text, index) => {
    const testParagraph = paragraph + " " + text;

    if (newParagraph) {
      newParagraph += " " + text;
    }

    const metrics = canvas.measureText(newParagraph ?? testParagraph).width;
    if (metrics <= maxWidth) {
      paragraph += ` ${text}`;
    } else {
      newParagraph = text;
      paragraph += `\n ${text}`;
    }
    //console.log(metrics,maxWidth);
  });
  return paragraph;
}
