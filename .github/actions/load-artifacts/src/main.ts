/*
 * Copyright (C) OPAN concept SA - All Rights Reserved.
 * THE CONTENTS OF THIS PROJECT ARE PROPRIETARY AND CONFIDENTIAL.
 * UNAUTHORIZED COPYING, TRANSFERRING OR REPRODUCTION OF THE CONTENT
 * OF THIS PROJECT, VIA ANY MEDIUM IS STRICTLY PROHIBITED.
 *
 * Please read LICENSE file for details
 */

import * as core from '@actions/core';
// import github from '@actions/github';

import { ArtifactClient, DownloadResponse, create } from '@actions/artifact';

const path = '/tmp';

function processArtifact(response: DownloadResponse) {
  console.log('Process ', response.artifactName, response.downloadPath);
}

async function download(client: ArtifactClient, name: string) {
  try {
    return await client.downloadArtifact(name, path);
  } catch {
    throw new Error(`Failed to download artifact "${name}"`);
  }
}

async function downloadSelection(client: ArtifactClient, names: string[]) {
  return await Promise.all(
    names.map(async (name) => {
      return await download(client, name);
    }),
  );
}

async function downloadAll(client: ArtifactClient) {
  return await client.downloadAllArtifacts();
}

async function run() {
  try {
    const client = create();
    const artifacts = core.getInput('artifacts')?.trim();
    const array = artifacts
      .split(/\s/)
      .map((a) => a.trim())
      .filter((a) => !!a);

    const downloaded = await (array && array.length > 0
      ? downloadSelection(client, array)
      : downloadAll(client));

    downloaded.forEach((artifact) => {
      processArtifact(artifact);
    });
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('Unexpected error');
    }
  }
}

run();
