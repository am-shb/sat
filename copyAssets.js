import { copySync, ensureDir, readdir } from "fs-extra";
import { join } from "path";

export default async (nitroApp) => {
  const baseDir = "content/quizzes";
  const publicDir = nitroApp.options.output.publicDir;
  const assetsDir = join(publicDir, "assets");

  try {
    await ensureDir(assetsDir);
  } catch (err) {
    console.error(err);
  }
  try {
    copySync("content/assets", join(assetsDir), {
      overwrite: true,
    });
    console.log("Copied general assets folder");
  } catch (err) {
    console.error(err);
  }

  const quiz_list = await readdir(baseDir);
  for (const quiz of quiz_list) {
    const quizAssetsDir = join(baseDir, quiz, "assets");
    try {
      copySync(quizAssetsDir, join(assetsDir, quiz), {
        overwrite: true,
      });
      console.log("Copied assets for", quiz);
    } catch (err) {
      console.error(err);
    }
  }

  console.log("Done copying assets!");
};
