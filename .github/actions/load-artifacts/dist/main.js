"use strict";
/*
 * Copyright (C) OPAN concept SA - All Rights Reserved.
 * THE CONTENTS OF THIS PROJECT ARE PROPRIETARY AND CONFIDENTIAL.
 * UNAUTHORIZED COPYING, TRANSFERRING OR REPRODUCTION OF THE CONTENT
 * OF THIS PROJECT, VIA ANY MEDIUM IS STRICTLY PROHIBITED.
 *
 * Please read LICENSE file for details
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
// import github from '@actions/github';
const artifact_1 = require("@actions/artifact");
const path = '/tmp';
function processArtifact(response) {
    console.log('Process ', response.artifactName, response.downloadPath);
}
async function download(client, name) {
    try {
        return await client.downloadArtifact(name, path);
    }
    catch {
        throw new Error(`Failed to download artifact "${name}"`);
    }
}
async function downloadSelection(client, names) {
    return await Promise.all(names.map(async (name) => {
        return await download(client, name);
    }));
}
async function downloadAll(client) {
    return await client.downloadAllArtifacts();
}
async function run() {
    try {
        const client = (0, artifact_1.create)();
        const artifacts = core_1.default.getInput('artifacts');
        const array = artifacts.split(/\s/).map((a) => a.trim());
        const downloaded = await (array && array.length > 0
            ? downloadSelection(client, array)
            : downloadAll(client));
        downloaded.forEach((artifact) => {
            processArtifact(artifact);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            core_1.default.setFailed(error.message);
        }
        else {
            core_1.default.setFailed('Unexpected error');
        }
    }
}
run();
