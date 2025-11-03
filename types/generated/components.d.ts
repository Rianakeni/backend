import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksRiwayat extends Struct.ComponentSchema {
  collectionName: 'components_blocks_riwayats';
  info: {
    displayName: 'Riwayat';
  };
  attributes: {
    icon: Schema.Attribute.Component<'shared.icon', true>;
    schedule: Schema.Attribute.Component<'blocks.schedule', true>;
  };
}

export interface BlocksSchedule extends Struct.ComponentSchema {
  collectionName: 'components_blocks_schedules';
  info: {
    displayName: 'Schedule';
  };
  attributes: {
    jam: Schema.Attribute.Time;
    tanggal: Schema.Attribute.Date;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Component<'shared.icon', false>;
    titlePage: Schema.Attribute.String;
  };
}

export interface LayoutPart extends Struct.ComponentSchema {
  collectionName: 'components_layout_parts';
  info: {
    displayName: 'Part';
  };
  attributes: {
    schedule: Schema.Attribute.Component<'blocks.schedule', true>;
  };
}

export interface SharedIcon extends Struct.ComponentSchema {
  collectionName: 'components_shared_icons';
  info: {
    displayName: 'Icon';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isButtonLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface SharedLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.riwayat': BlocksRiwayat;
      'blocks.schedule': BlocksSchedule;
      'layout.header': LayoutHeader;
      'layout.part': LayoutPart;
      'shared.icon': SharedIcon;
      'shared.link': SharedLink;
      'shared.logo': SharedLogo;
    }
  }
}
