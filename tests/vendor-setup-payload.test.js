const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('vendor setup submits explicit contact and remit-address fields', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

  for (const [field, sourceId] of [
    ['Contact Email', 'ct_email'],
    ['Contact Phone', 'ct_phone'],
    ['Remit Street', 'bill_street'],
    ['Remit City', 'bill_city'],
    ['Remit State', 'bill_state'],
    ['Remit Zip', 'bill_zip'],
  ]) {
    assert.match(
      html,
      new RegExp(`fd\\.append\\('${field}',\\s*val\\('${sourceId}'\\)`),
      `${field} must be mapped from ${sourceId}`,
    );
  }
});
