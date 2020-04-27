class Sorting {
  constructor() {
    this.data = [
      {
        id: 26,
        title: 'Побег из Шоушенка',
        imdb: 9.30,
        year: 1994,
      },
      {
        id: 25,
        title: 'Крёстный отец',
        imdb: 9.20,
        year: 1972,
      },
      {
        id: 27,
        title: 'Крёстный отец 2',
        imdb: 9.00,
        year: 1974,
      },
      {
        id: 1047,
        title: 'Тёмный рыцарь',
        imdb: 9.00,
        year: 2008,
      },
      {
        id: 223,
        title: 'Криминальное чтиво',
        imdb: 8.90,
        year: 1994,
      },
    ];
  }

  loadList() {
    this.redrawDOM();
  }

  redrawDOM() {
    if (typeof document !== 'undefined') {
      const doc = document.getElementById('tbody');
      doc.innerHTML = '';
      for (const el of this.data) {
        const tr = document.createElement('tr');
        tr.dataset.id = el.id;
        tr.dataset.title = el.title;
        tr.dataset.year = el.year;
        tr.dataset.imdb = el.imdb;
        tr.innerHTML = `
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>(${el.year})</td>
            <td>imdb: ${el.imdb.toFixed(2)}</td>
          `;
        doc.appendChild(tr);
      }
    }
  }

  sortImg(columnSort, sortArrow) {
    if (typeof document !== 'undefined') {
      const oldRow = document.querySelector('span');
      if (oldRow) {
        const parentOldRow = oldRow.parentNode;
        parentOldRow.removeChild(oldRow);
      }

      sortArrow === 'up' ? '\u{2191}' : '\u{2193}';

      const titleHead = document.getElementById(`head-${columnSort}`);
      const addArrow = document.createElement('span');
      addArrow.innerText = sortArrow === 'up' ? '\u{2191}' : '\u{2193}';
      titleHead.appendChild(addArrow);
    }
  }

  sortStringDown(columnSort) {
    this.sortImg(columnSort, 'down');
    this.sortList('string', columnSort, 'down');
  }

  sortStringUp(columnSort) {
    this.sortImg(columnSort, 'up');
    this.sortList('string', columnSort, 'up');
  }

  sortNumbDown(columnSort) {
    this.sortImg(columnSort, 'down');
    this.sortList('numb', columnSort, 'down');
  }

  sortNumbUp(columnSort) {
    this.sortImg(columnSort, 'up');
    this.sortList('numb', columnSort, 'up');
  }

  sortList(columnType, columnSort, sortDirection) {
    if (columnType === 'string') {
      this.sortStr(columnSort, sortDirection);
    } else if (columnType === 'numb') {
      this.sortNum(columnSort, sortDirection);
    }
    this.redrawDOM();
  }

  sortStr(columnSort, sortDirection) {
    this.data.sort((a, b) => {
      if (a[columnSort] > b[columnSort]) return sortDirection === 'down' ? -1 : 1;
      if (a[columnSort] < b[columnSort]) return sortDirection === 'down' ? 1 : -1;
      return 0;
    });
  }

  sortNum(columnSort, sortUpDown) {
    this.data.sort((a, b) => {
      if (sortUpDown === 'down') return b[columnSort] - a[columnSort];
      return a[columnSort] - b[columnSort];
    });
  }

  randomSort() {
    let item = 1;
    setInterval(() => {
      switch (item) {
        case 1:
          this.sortNumbUp('id');
          break;
        case 2:
          this.sortNumbDown('id');
          break;
        case 3:
          this.sortStringUp('title');
          break;
        case 4:
          this.sortStringDown('title');
          break;
        case 5:
          this.sortNumbUp('year');
          break;
        case 6:
          this.sortNumbDown('year');
          break;
        case 7:
          this.sortNumbUp('imdb');
          break;
        default:
          this.sortNumbDown('imdb');
          item = 0;
          break;
      }
      item += 1;
    }, 2000);
  }
}

const sort = new Sorting();
sort.loadList();
sort.randomSort();
