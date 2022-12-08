import { build, defaults } from 'annotatedtext-remark';
import useStore from 'renderer/store/useStore';

export interface LanguageToolApi {
  software: Software;
  warnings: Warnings;
  language: Language;
  matches?: MatchesEntity[] | null;
}
export interface Software {
  name: string;
  version: string;
  buildDate: string;
  apiVersion: number;
  premium: boolean;
  premiumHint: string;
  status: string;
}
export interface Warnings {
  incompleteResults: boolean;
}
export interface Language {
  name: string;
  code: string;
  detectedLanguage: DetectedLanguage;
}
export interface DetectedLanguage {
  name: string;
  code: string;
  confidence: number;
}
export interface MatchesEntity {
  message: string;
  shortMessage: string;
  replacements?: ReplacementsEntity[] | null;
  offset: number;
  length: number;
  context: Context;
  sentence: string;
  type: Type;
  rule: Rule;
  ignoreForIncompleteSentence: boolean;
  contextForSureMatch: number;
}
export interface ReplacementsEntity {
  value: string;
}
export interface Context {
  text: string;
  offset: number;
  length: number;
}
export interface Type {
  typeName: string;
}
export interface Rule {
  id: string;
  description: string;
  issueType: string;
  category: Category;
}
export interface Category {
  id: string;
  name: string;
}

export const checkText = async (
  text: string,
  abortSignal: AbortSignal
): Promise<LanguageToolApi> => {
  const tree = build(text, {
    ...defaults,
    interpretmarkup(text = ''): string {
      // Don't collapse inline code
      if (/^`[^`]+`$/.test(text)) {
        return text;
      }

      return '\n'.repeat((text.match(/\n/g) || []).length);
    },
  });

  const { languageToolEndpointUrl, languageToolUsername, languageToolApiKey } =
    useStore.getState().settings;

  const requestParams: { [key: string]: string } = {
    data: JSON.stringify(tree),
    language: 'auto',
    enabledOnly: 'false',
    level: 'default',
    username: languageToolUsername,
    apiKey: languageToolApiKey,
  };

  let response: Response;

  try {
    response = await fetch(`${languageToolEndpointUrl}/v2/check`, {
      method: 'POST',
      body: Object.keys(requestParams)
        .map((key) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            requestParams[key]
          )}`;
        })
        .join('&'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      signal: abortSignal,
    });
  } catch (e) {
    return Promise.reject(e);
  }

  if (!response.ok) {
    return Promise.reject(
      new Error(`unexpected status ${response.status}, see network tab`)
    );
  }

  let body: LanguageToolApi;
  try {
    body = await response.json();
  } catch (e) {
    return Promise.reject(e);
  }
  return body;
};
