import { faker } from '@faker-js/faker';

const columns = [
  'HB.import_ref',
  'HB.location',
  'HB.labels',
  'HB.asset_id',
  'HB.archived',
  'HB.url',
  'HB.name',
  'HB.quantity',
  'HB.description',
  'HB.insured',
  'HB.notes',
  'HB.purchase_price',
  'HB.purchase_from',
  'HB.purchase_time',
  'HB.manufacturer',
  'HB.model_number',
  'HB.serial_number',
  'HB.lifetime_warranty',
  'HB.warranty_expires',
  'HB.warranty_details',
  'HB.sold_to',
  'HB.sold_price',
  'HB.sold_time',
  'HB.sold_notes',
].join(',');

let count = 100;

const generateRow = () => {
  const row: string[] = [];

  row.push('');

  row.push(
    faker.helpers.arrayElement([
      'Garage',
      'Living Room',
      'Office',
      'Downstairs',
      'Entry',
      'Kitchen',
    ])
  );

  row.push(
    faker.helpers
      .arrayElements(['IOT', 'Home Assistant', 'Z-Wave'], {
        min: 1,
        max: 3,
      })
      .join('; ')
  );

  row.push((count++).toString());

  row.push('false'.toString());

  row.push(`https://demo.homebox.software/item/${faker.string.uuid()}`);

  row.push(faker.lorem.words({ min: 1, max: 10 }));

  row.push(faker.number.int({ min: 1, max: 100 }).toString());

  row.push(faker.lorem.sentences({ min: 1, max: 10 }));

  row.push(faker.datatype.boolean().toString());

  row.push('');

  row.push(
    faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }).toString()
  );

  row.push(faker.company.name());

  row.push(faker.date.past().toISOString().split('T')[0]!);

  row.push(faker.company.name());

  row.push(faker.string.alphanumeric({ length: { min: 1, max: 10 } }));

  row.push(faker.string.alphanumeric({ length: { min: 1, max: 10 } }));

  row.push(faker.datatype.boolean().toString());

  row.push('');
  row.push('');
  row.push('');
  row.push('0');
  row.push('');
  row.push('');

  return row.map((x) => x.replaceAll(',', '')).join(',');
};

const NUM_ROWS = 100;

const out = [columns];

for (let i = 0; i < NUM_ROWS; i++) {
  out.push(generateRow());
}

await Bun.write('./out.csv', out.join('\n'));
