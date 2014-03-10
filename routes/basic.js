// exports.index = function(req, res) {
//   res.render('index', { user: req.user });
//   // req.flash('info', 'Flash is back!')
// };


exports.index = function(req, res) {
  res.render('index.html', { user: req.user });
};
