module.exports = function (shipit) {
  require('shipit-deploy')(shipit)

  const workspace = '/tmp/shipit/choo-experiments'

  shipit.initConfig({
    default: {
      workspace,
      deployTo: '/home/rascarlito/www/choo-experiments',
      repositoryUrl: 'git@github.com:RasCarlito/choo-experiments.git',
      keepReleases: 3,
      ignores: ['.git'],
      dirToCopy: `${workspace}/dist`
    },
    production: {
      servers: 'rascarlito@carlogren.com'
    }
  })

  shipit.blTask('dependencies', () => {
    return shipit.local(`cd ${workspace} && npm install`)
      .then(() => {
        shipit.log('Successfully installed dependencies')
      })
      .catch(() => {
        shipit.log('Failed to install dependencies')
      })
  })

  shipit.blTask('build', () => {
    return shipit.local(`cd ${workspace} && npm run build`)
      .then(() => {
        shipit.log('Successfully built the project')
      })
      .catch(() => {
        shipit.log('Failed to build the project')
      })
  })

  shipit.on('fetched', () => {
    shipit.start('dependencies', 'build')
  })
}
