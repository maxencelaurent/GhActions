/*
 * Copyright (C) OPAN concept SA - All Rights Reserved.
 * THE CONTENTS OF THIS PROJECT ARE PROPRIETARY AND CONFIDENTIAL.
 * UNAUTHORIZED COPYING, TRANSFERRING OR REPRODUCTION OF THE CONTENT
 * OF THIS PROJECT, VIA ANY MEDIUM IS STRICTLY PROHIBITED.
 *
 * Please read LICENSE file for details
 */

import * as artifact from '@actions/artifact';

const client = artifact.create();

const path = '/tmp';

async function download(name: string) {
  try {
    const result = await client.downloadArtifact(name, path);
    console.log('Artifact', name, result);
  } catch {
    console.log('Not found Artifact', name);
  }
}

console.log('ENV ', process.env);

const myToken = process.argv[2] || '';
console.log('My token ', myToken.length, myToken);

process.env.ACTIONS_RUNTIME_TOKEN = myToken;
console.log('ENV ACTIONS TOKEN', process.env.ACTIONS_RUNTIME_TOKEN);

for (const name of ['homework', 'skhdkhh']) {
  download(name);
}
