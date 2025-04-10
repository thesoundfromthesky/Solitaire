import globby from 'globby';

export function beforeAdd(git) {
  const files = globby
    .sync(options.remove, {
      cwd: path.join(git.cwd, options.dest),
      dot: true,
    })
    .map((file) => path.join(options.dest, file));

  if (files.length > 0) {
    return git.rm(files);
  } else {
    return git;
  }
}
