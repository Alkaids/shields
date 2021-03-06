'use strict'

const Joi = require('joi')
const ServiceTester = require('../service-tester')
const {
  isVPlusDottedVersionNClausesWithOptionalSuffix,
} = require('../test-validators')

const t = new ServiceTester({ id: 'aur', title: 'Arch Linux AUR' })
module.exports = t

// version tests

t.create('version (valid)')
  .get('/version/yaourt.json?style=_shields_test')
  .expectJSONTypes(
    Joi.object().keys({
      name: 'aur',
      value: isVPlusDottedVersionNClausesWithOptionalSuffix,
      colorB: '#007ec6',
    })
  )

t.create('version (valid, out of date)')
  .get('/version/gog-gemini-rue.json?style=_shields_test')
  .expectJSONTypes(
    Joi.object().keys({
      name: 'aur',
      value: isVPlusDottedVersionNClausesWithOptionalSuffix,
      colorB: '#fe7d37',
    })
  )

t.create('version (not found)')
  .get('/version/not-a-package.json')
  .expectJSON({ name: 'aur', value: 'not found' })

// votes tests

t.create('votes (valid)')
  .get('/votes/yaourt.json')
  .expectJSONTypes(
    Joi.object().keys({
      name: 'votes',
      value: Joi.number().integer(),
    })
  )

t.create('votes (not found)')
  .get('/votes/not-a-package.json')
  .expectJSON({ name: 'votes', value: 'not found' })

// license tests

t.create('license (valid)')
  .get('/license/yaourt.json')
  .expectJSON({ name: 'license', value: 'GPL' })

t.create('license (not found)')
  .get('/license/not-a-package.json')
  .expectJSON({ name: 'license', value: 'not found' })
