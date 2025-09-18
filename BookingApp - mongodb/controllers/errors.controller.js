export const pageNotFound = (req, res, next) => {
  // res.sendFile(path.join(path.resolve( ), 'views', '404.html'));
  const { originalUrl } = req;
  res.render("404", { originalUrl });
  res.status(404)
  console.log(req.originalUrl);
}