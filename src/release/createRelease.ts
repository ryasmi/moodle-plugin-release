import axios from 'axios';
import * as FormData from 'form-data';

interface Opts {
  readonly githubRepoSlug: string;
  readonly githubRepoTag: string;
  readonly itemId: string;
  readonly moodleCookies: string;
  readonly moodlePluginId: string;
  readonly pluginVersion: string;
  readonly releaseNotes: string;
  readonly sessionKey: string;
  readonly uploadId: number;
}

export default async ({
  itemId,
  githubRepoSlug,
  moodleCookies,
  moodlePluginId,
  releaseNotes,
  sessionKey,
  githubRepoTag,
  uploadId,
  pluginVersion,
}: Opts) => {
  const formData = new FormData();
  formData.append('id', moodlePluginId);
  formData.append('archiveparsed', '1');
  formData.append('curstep', '4');
  formData.append('sesskey', sessionKey);
  formData.append('_qf__local_plugins_upload_version_form', '1');
  formData.append('version_archive_filemanager', itemId); // Item id?
  formData.append('version_options[renameroot]', '1');
  formData.append('version_options[autoremove]', '');
  formData.append('version_options[renamereadme]', '');
  formData.append('mform_showmore_id_versioninfoheading', '0');
  formData.append('mform_showmore_id_softwareversionheading', '0');
  formData.append('mform_isexpanded_id_versioninfoheading', '1');
  formData.append('mform_isexpanded_id_softwareversionheading', '1');
  formData.append('mform_isexpanded_id_vcsheading', '0');
  formData.append('version_version', pluginVersion);
  formData.append('version_releasename', githubRepoTag);
  formData.append('version_maturity', '200');
  formData.append('version_releasenotes_editor[text]', releaseNotes);
  formData.append('version_releasenotes_editor[format]', '4');
  formData.append('version_releasenotes_editor[itemid]', uploadId); // Upload id?
  formData.append('version_changelogurl', '');
  formData.append('version_altdownloadurl', '');
  formData.append('version_updateableid', '_qf__force_multiselect_submission');
  formData.append('version_softwareversion[Moodle]', '_qf__force_multiselect_submission');
  formData.append('version_softwareversion[Moodle][]', '29');
  formData.append('version_softwareversion[Moodle][]', '27');
  formData.append('version_softwareversion[Moodle][]', '25');
  formData.append('version_softwareversion[Moodle][]', '24');
  formData.append('version_softwareversion[Moodle][]', '23');
  formData.append('version_softwareversion[Moodle][]', '21');
  formData.append('version_softwareversion[Moodle][]', '20');
  formData.append('version_softwareversion[Moodle][]', '19');
  formData.append('version_softwareversion[PHP]', '_qf__force_multiselect_submission');
  formData.append('version_vcssystem', 'git');
  formData.append('version_vcsrepositoryurl', `https://github.com/${githubRepoSlug}`);
  formData.append('version_vcsbranch', '');
  formData.append('version_vcstag', githubRepoTag);
  formData.append('continue', 'Add a new version');
  await axios({
    data: formData,
    headers: {
      'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
      cookie: moodleCookies,
      referer: 'https://moodle.org/plugins/addversion.php',
    },
    maxRedirects: 0,
    method: 'POST',
    url: 'https://moodle.org/plugins/addversion.php',
  });
};
