const Group = {
  Display: "display",
  FormElements: "form-elements",
  Misc: "misc",
  Modals: "modals",
  Navigation: "navigation",
  Notifications: "notifications",
  Patterns: "patterns",
} as const;

type Group = (typeof Group)[keyof typeof Group];

export { Group };

export const components = [
  { name: "Badge", navPath: "/badge/live-example", group: Group.Notifications },
  {
    name: "Banner",
    navPath: "/banner/live-example",
    group: Group.Notifications,
  },
  {
    name: "Button",
    navPath: "/button/live-example",
    group: Group.FormElements,
  },
  { name: "Card", navPath: "/card/live-example", group: Group.Display },
  {
    name: "Callout",
    navPath: "/callout/live-example",
    group: Group.Notifications,
  },
  {
    name: "Checkbox",
    navPath: "/checkbox/live-example",
    group: Group.FormElements,
  },
  {
    name: "Chip",
    navPath: "/chip/live-example",
    group: Group.Misc,
  },
  {
    name: "Code",
    navPath: "/code/live-example",
    group: Group.Display,
  },
  {
    name: "Combobox",
    navPath: "/combobox/live-example",
    group: Group.FormElements,
  },
  {
    name: "Confirmation Modal",
    navPath: "/confirmation-modal/live-example",
    group: Group.Modals,
  },
  {
    name: "Copyable",
    navPath: "/copyable/live-example",
    group: Group.Display,
  },
  {
    name: "Date Picker",
    navPath: "/date-picker/live-example",
    group: Group.FormElements,
  },
  {
    name: "Empty State",
    navPath: "/empty-state/live-example",
    group: Group.Patterns,
  },
  {
    name: "Expandable Card",
    navPath: "/expandable-card/live-example",
    group: Group.Display,
  },
  {
    name: "Form Footer",
    navPath: "/form-footer/live-example",
    group: Group.FormElements,
  },
  {
    name: "Guide Cue",
    navPath: "/guide-cue/live-example",
    group: Group.Notifications,
  },
  {
    name: "Icon Button",
    navPath: "/icon/live-example",
    group: Group.FormElements,
  },
  {
    name: "Info Sprinkle",
    navPath: "/info-sprinkle/live-example",
    group: Group.Misc,
  },
  {
    name: "Inline Definition",
    navPath: "/inline-definition/live-example",
    group: Group.Misc,
  },
  {
    name: "Loading Indicator",
    navPath: "/loading-indicator/live-example",
    group: Group.Misc,
  },
  {
    name: "Logo",
    navPath: "/logo/live-example",
    group: Group.Misc,
  },
  {
    name: "Marketing Modal",
    navPath: "/marketing-modal/live-example",
    group: Group.Modals,
  },
  {
    name: "Menu",
    navPath: "/menu/live-example",
    group: Group.Navigation,
  },
  {
    name: "Modal",
    navPath: "/modal/live-example",
    group: Group.Modals,
  },
  {
    name: "Number Input",
    navPath: "/number-input/live-example",
    group: Group.FormElements,
  },
  {
    name: "Pagination",
    navPath: "/pagination/live-example",
    group: Group.Misc,
  },
  {
    name: "Password Input",
    navPath: "/password-input/live-example",
    group: Group.FormElements,
  },
  {
    name: "Pipeline",
    navPath: "/pipeline/live-example",
    group: Group.Display,
  },
  {
    name: "Popover",
    navPath: "/popover/live-example",
    group: Group.Misc,
  },
  {
    name: "Radio Box Group",
    navPath: "/radio-box-group/live-example",
    group: Group.FormElements,
  },
  {
    name: "Radio Group",
    navPath: "/radio-group/live-example",
    group: Group.FormElements,
  },
  {
    name: "Search Input",
    navPath: "/search-input/live-example",
    group: Group.FormElements,
  },
  {
    name: "Segmented Control",
    navPath: "/segmented-control/live-example",
    group: Group.Display,
  },
  {
    name: "Select",
    navPath: "/select/live-example",
    group: Group.FormElements,
  },
  {
    name: "Side Nav",
    navPath: "/side-nav/live-example",
    group: Group.Navigation,
  },
  {
    name: "Skeleton Loader",
    navPath: "/skeleton-loader/live-example",
    group: Group.Misc,
  },
  {
    name: "Split Button",
    navPath: "/split-button/live-example",
    group: Group.Misc,
  },
  {
    name: "Stepper",
    navPath: "/stepper/live-example",
    group: Group.Misc,
  },
  {
    name: "Table",
    navPath: "/table/live-example",
    group: Group.Display,
  },
  {
    name: "Tabs",
    navPath: "/tabs/live-example",
    group: Group.Navigation,
  },
  {
    name: "Text Area",
    navPath: "/text-area/live-example",
    group: Group.FormElements,
  },
  {
    name: "Text Input",
    navPath: "/text-input/live-example",
    group: Group.FormElements,
  },
  {
    name: "Toast",
    navPath: "/toast/live-example",
    group: Group.Notifications,
  },
  {
    name: "Toggle",
    navPath: "/toggle/live-example",
    group: Group.FormElements,
  },
  {
    name: "Tooltip",
    navPath: "/tooltip/live-example",
    group: Group.Notifications,
  },
] as const;

export type ComponentMeta = { name: string; navPath: string };

export const groupedComponents = components.reduce((acc, obj) => {
  const { group, name, navPath } = obj;
  if (!acc[group]) {
    acc[group] = [];
  }
  acc[group].push({ name, navPath });
  // Sort the array by component value
  acc[group].sort((a, b) => a.name.localeCompare(b.name));
  return acc;
}, {} as Record<Group, ComponentMeta[]>);
