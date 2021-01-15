class BinaryTree {
  constructor() {
    this.root;
  }

  add(value) {
    (this.root) ? this.root.add(value) : this.root = new BinaryTree.Node(value);
  }

  toArray() {
    return this.root.toArray();
  }

  indexOf(value) {
    return this.toArray().indexOf(value);
  }

  get(index) {
    return this.toArray()[index];
  }

  size() {
    return this.toArray().length;
  }

  display(canvas, options) {
    this.root.display(canvas, canvas.width/2, options.diameter, options);
  }
}

BinaryTree.Node = class {
  constructor(value) {
    this.value = value;
    this.left;
    this.right;
  }

  add(value) {
    (value < this.value) ? this.addToLeft(value) : this.addToRight(value);
  }

  addToLeft(value) {
    (this.left) ? this.left.add(value) : this.left = new BinaryTree.Node(value); 
  }

  addToRight(value) {
    (this.right) ? this.right.add(value) : this.right = new BinaryTree.Node(value); 
  }

  toArray() {
    let arr = [];
    if (this.left) arr = arr.concat(this.left.toArray());
    arr.push(this.value);
    if (this.right) arr = arr.concat(this.right.toArray()); 
    return arr;
  }

  displayConnection(canvas, x, y, px, py) {
    if (x && y) {
      canvas.begin();
      canvas.noFill();
      canvas.stroke(255);
      canvas.strokeWeight(2);
      canvas.line(x, y, px, py);
      canvas.end();
    }
  }

  displayValueAt(canvas, x, y, size) {
    canvas.begin();
    canvas.fill(255);
    canvas.noStroke();
    canvas.textAlign('center');
    canvas.textSize(size+'px');
    canvas.text(this.value, x, y);
    canvas.end();
  }

  displayBubbleAt(canvas, x, y, diameter) {
    canvas.begin();
    canvas.noFill();
    canvas.stroke(255);
    canvas.strokeWeight(2);
    canvas.ellipse(x, y, diameter);
    canvas.end();
  }

  display(canvas, x, y, options, px, py, i = 1) {
    let { diameter } = options;

    this.displayBubbleAt(canvas, x, y, diameter);
    this.displayConnection(canvas, x, y, px, py);
    this.displayValueAt(canvas, x, y, diameter);

    if (options.offset.x > diameter) options.offset.x -= diameter;
    const localOffset = {x: options.offset.x*i, y: options.offset.y*i};
    if (this.left) this.left.display(canvas, x-localOffset.x, y+localOffset.y, options, x, y);
    if (this.right) this.right.display(canvas, x+localOffset.x, y+localOffset.y, options, x, y);

    i++;
  }
}