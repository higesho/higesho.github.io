// 一覧の絞り込み。外部の何にも依存しない。
(function () {
  var q = document.getElementById('q');
  if (!q) return;
  var depth = document.getElementById('depth');
  var group = document.getElementById('group');
  var count = document.getElementById('count');
  var cards = [].slice.call(document.querySelectorAll('.card[data-t]'));

  function apply() {
    var text = q.value.trim().toLowerCase();
    var lo = 0, hi = 999;
    if (depth && depth.value) {
      var p = depth.value.split('-');
      lo = parseInt(p[0], 10); hi = parseInt(p[1], 10);
    }
    var g = group ? group.value : '';
    var shown = 0;
    cards.forEach(function (c) {
      var ok = true;
      if (text && c.dataset.t.indexOf(text) < 0) ok = false;
      if (ok && depth && depth.value) {
        var d = parseInt(c.dataset.depth || '0', 10);
        if (d < lo || d > hi) ok = false;
      }
      if (ok && g && c.dataset.g !== g) ok = false;
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
  if (depth) depth.addEventListener('change', apply);
  if (group) group.addEventListener('change', apply);
  apply();
})();
