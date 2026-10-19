// 一覧の絞り込み。外部の何にも依存しない。
// #q: 文字で絞る(data-t)、#b: 空白区切りの印に含まれるか(data-b)、
// #g: 印が一致するか(data-g)。
(function () {
  var q = document.getElementById('q');
  if (!q) return;
  var b = document.getElementById('b');
  var g = document.getElementById('g');
  var count = document.getElementById('count');
  var cards = [].slice.call(document.querySelectorAll('.card[data-t]'));

  function apply() {
    var text = q.value.trim().toLowerCase();
    var bv = b ? b.value : '';
    var gv = g ? g.value : '';
    var shown = 0;
    cards.forEach(function (c) {
      var ok = true;
      if (text && c.dataset.t.indexOf(text) < 0) ok = false;
      if (ok && bv && (' ' + (c.dataset.b || '') + ' ').indexOf(' ' + bv + ' ') < 0) ok = false;
      if (ok && gv && c.dataset.g !== gv) ok = false;
      c.classList.toggle('hide', !ok);
      if (ok) shown++;
    });
    if (count) count.textContent = shown + ' / ' + cards.length;
    // 中身が全部消えた節は見出しごと隠す
    [].slice.call(document.querySelectorAll('.tree')).forEach(function (s) {
      var any = s.querySelector('.card:not(.hide)');
      s.classList.toggle('hide', !any);
    });
  }
  q.addEventListener('input', apply);
  if (b) b.addEventListener('change', apply);
  if (g) g.addEventListener('change', apply);
  apply();
})();
