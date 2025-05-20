import { clickBy, waitBy } from '../../lib.mjs';
import { By } from 'selenium-webdriver';
import actionIdleWait from '../actionIdleWait.mjs';
import actionUploadCloudTracks from './actionUploadCloudTracks.mjs';
import actionDeleteTracksByPattern from './actionDeleteTracksByPattern.mjs';
import { driver } from '../../options.mjs';

export default async function test(tracks, trackName = null, newName = trackName) {
    await actionIdleWait();
    if (!trackName) {
        const files = tracks.map((t) => t.path).join('\n');
        return actionUploadCloudTracks({ files });
    }

    const { path } = tracks.find((t) => t.name === trackName);
    let retries = 0;
    const maxRetries = 3;

    while (retries < maxRetries) {
        await actionUploadCloudTracks({ files: path });
        await clickBy(By.id('se-button-back'));
        await waitBy(By.id(`se-cloud-track-${newName}`));

        const elems = await driver.findElements(By.css(`[id^="se-cloud-track-${newName}"]`));
        if (elems.length <= 1) {
            return;
        }
        console.log(`Duplicate detected, deletion attempt #${retries + 1}`);
        await actionDeleteTracksByPattern(newName);
        retries++;
    }
}
