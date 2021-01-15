

(window.onload = function () { 
  const bt = new BinaryTree();
  const canvas = createCanvas(600, 600);
  canvas.background(0);

  const size = 20;
  for (let i=0; i<size; i++) {
    bt.add(floor(random(-size, size)));
  }

  bt.display(canvas, {diameter: 20, offset: {x: 120, y: 40}});
  console.log(bt.toArray());
})