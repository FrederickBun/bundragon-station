declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"site-move.md": {
	id: "site-move.md";
  slug: "site-move";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};
"spec": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "spec";
  data: InferEntrySchema<"spec">
} & { render(): Render[".md"] };
"friends.md": {
	id: "friends.md";
  slug: "friends";
  body: string;
  collection: "spec";
  data: InferEntrySchema<"spec">
} & { render(): Render[".md"] };
"projects.md": {
	id: "projects.md";
  slug: "projects";
  body: string;
  collection: "spec";
  data: InferEntrySchema<"spec">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"friends": {
"1rayminn": {
	id: "1rayminn";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"2evannotfound": {
	id: "2evannotfound";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"akilar": {
	id: "akilar";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"cx330": {
	id: "cx330";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"dusays": {
	id: "dusays";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"everfu": {
	id: "everfu";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"isyangs": {
	id: "isyangs";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"kegongteng": {
	id: "kegongteng";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"lxchapu": {
	id: "lxchapu";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"xaoxuu": {
	id: "xaoxuu";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"zfe": {
	id: "zfe";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
"zhheo": {
	id: "zhheo";
  collection: "friends";
  data: InferEntrySchema<"friends">
};
};
"projects": {
"gyoza": {
	id: "gyoza";
  collection: "projects";
  data: InferEntrySchema<"projects">
};
"redefine": {
	id: "redefine";
  collection: "projects";
  data: InferEntrySchema<"projects">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
