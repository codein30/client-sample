'use strict'

module.exports = (opts) => {
  const assert = opts.assert
  const Bot = require('../bots/bot')
  let bot
  beforeEach(() => {
    bot = new Bot(opts.bus)
  })

  describe('#getRemoteConfig', () => {
    it('should retrieve the config from git in a decrypted format without throwing an error', async function () {
      this.timeout(50000)

      await bot.getRemoteConfig()
    })
  })

  describe('#getTenantConfigs', () => {
    it('should return an object containing all of the tenant configs', async function () {
      this.timeout(9000)

      const configs = await bot.getTenantConfigs()

      assert(Object.keys(configs).includes('redplanet'))
    })
  })

  describe('#getConfig', () => {
    it('should return an object with local params for saturn, uniexi', async function () {
      this.timeout(9000)

      const config = await bot.getConfig('redplanet')
      const keys = ['uniexi', 'saturn']

      keys.map(k => {
        assert(Object.keys(config).includes(k))
      })

      assert.equal(config.saturn.mysql.database, `pyr-redplanet-${process.env.NODE_ENV}`)
      assert.equal(config.uniexi.user, 'sa')
    })
  })
}
