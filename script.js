class Counter {
  constructor() {
    this.counter = 0;
  }
  id = () => {
    this.counter++;
    return this.counter;
  };
}

class Clicker {
  constructor() {
    this.counter = new Counter();
    this.data = {
      type: 'leaf',
      id: this.counter.id(),
      dir: 'h'
    };
    this.size = 800;
    this.app = document.getElementById('app');
    this.paint();
    this.events();
  }
  events = () => {
    this.app.addEventListener('click', e => {
      e.stopPropagation();
      let _i = e.target.getAttribute('idx');
      this.update(+_i);
    });
  };
  update = id => {
    let curr = this.search(id);
    curr.type = 'node';
    curr.children = [
      {
        type: 'leaf',
        id: this.counter.id(),
        dir: curr.dir === 'h' ? 'v' : 'h'
      },
      {
        type: 'leaf',
        id: this.counter.id(),
        dir: curr.dir === 'h' ? 'v' : 'h'
      }
    ];
    this.paint();
  };
  search = idx => {
    let temp = [];
    temp.push(this.data);
    while (temp.length) {
      let curr = temp.pop();
      if (curr.id === idx) {
        return curr;
      } else if (curr.children) {
        curr.children.forEach(ch => {
          temp.push(ch);
        });
      }
    }
  };
  paint = () => {
    this.app.innerHTML = '';
    this.app.style.width = this.size + 'px';
    this.app.style.height = this.size + 'px';
    this.app.style.margin = '0 auto';
    this.app.append(this.draw({ ...this.data }));
  };

  draw = data => {
    if (data.type === 'node') {
      const w = document.createElement('div');
      const f = this.draw(data.children[0], 0);
      w.setAttribute('idx', data.id);
      // w.setAttribute('idx', idx);
      let direction = data.dir === 'v' ? 'column' : 'row';
      w.style.flexDirection = direction;
      const s = this.draw(data.children[1], 1);
      w.append(f);
      w.append(s);
      return w;
    } else if (data.type === 'leaf') {
      const el = document.createElement('div');
      el.setAttribute('idx', data.id);
      return el;
    }
  };
}

const c = new Clicker();
