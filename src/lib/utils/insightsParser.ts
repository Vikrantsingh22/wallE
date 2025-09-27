/**
 * Utility service for parsing and validating LLM-generated insights
 */

export interface ParsedInsights {
  [key: string]: string;
}

export interface ValidationResult {
  isValid: boolean;
  insights: ParsedInsights;
  roast?: string;
  errors: string[];
}

export class InsightsParser {
  private static readonly EXPECTED_INSIGHT_KEYS = [
    "Overall portfolio health assessment",
    "Risk management recommendations",
    "Performance insights",
    "Suggested next steps",
  ];

  private static readonly ROAST_KEYS = ["Roast", "roast", "Hot Roast"];

  public static parseInsights(rawData: string): ValidationResult {
    const result: ValidationResult = {
      isValid: false,
      insights: {},
      errors: [],
    };

    if (!rawData || typeof rawData !== "string" || rawData.trim() === "") {
      result.errors.push("No insights data provided");
      return result;
    }

    try {
      // Clean the raw data by removing potential markdown formatting or extra characters
      const cleanedData = this.cleanRawData(rawData);

      // Try to parse as JSON
      const parsed = JSON.parse(cleanedData);

      if (typeof parsed !== "object" || parsed === null) {
        result.errors.push("Parsed data is not a valid object");
        return result;
      }

      // Extract insights and roast
      const { insights, roast } = this.extractInsightsAndRoast(parsed);

      // Validate insights
      const validatedInsights = this.validateInsights(insights);

      result.insights = validatedInsights.insights;
      result.roast = roast;
      result.isValid = Object.keys(validatedInsights.insights).length > 0;
      result.errors = validatedInsights.errors;

      return result;
    } catch (parseError) {
      // If JSON parsing fails, try to extract meaningful information
      result.errors.push(
        `JSON parsing failed: ${
          parseError instanceof Error ? parseError.message : "Unknown error"
        }`
      );

      // Attempt fallback parsing
      const fallbackResult = this.fallbackParsing(rawData);
      if (Object.keys(fallbackResult).length > 0) {
        result.insights = fallbackResult;
        result.isValid = true;
        result.errors.push("Used fallback parsing method");
      }

      return result;
    }
  }

  private static cleanRawData(rawData: string): string {
    // Remove markdown code blocks
    let cleaned = rawData.replace(/```json\s*/g, "").replace(/```\s*/g, "");

    // Remove any text before the first opening brace
    const firstBrace = cleaned.indexOf("{");
    if (firstBrace > 0) {
      cleaned = cleaned.substring(firstBrace);
    }

    // Remove any text after the last closing brace
    const lastBrace = cleaned.lastIndexOf("}");
    if (lastBrace !== -1 && lastBrace < cleaned.length - 1) {
      cleaned = cleaned.substring(0, lastBrace + 1);
    }

    return cleaned.trim();
  }

  private static extractInsightsAndRoast(parsed: any): {
    insights: any;
    roast?: string;
  } {
    let roast: string | undefined;
    const insights = { ...parsed };

    // Extract roast using various possible keys
    for (const roastKey of this.ROAST_KEYS) {
      if (insights[roastKey]) {
        roast = insights[roastKey];
        delete insights[roastKey];
        break;
      }
    }

    return { insights, roast };
  }

  private static validateInsights(insights: any): {
    insights: ParsedInsights;
    errors: string[];
  } {
    const validatedInsights: ParsedInsights = {};
    const errors: string[] = [];

    if (typeof insights !== "object" || insights === null) {
      errors.push("Insights data is not a valid object");
      return { insights: validatedInsights, errors };
    }

    // Validate each insight entry
    Object.entries(insights).forEach(([key, value]) => {
      if (typeof key === "string" && key.trim() !== "") {
        if (typeof value === "string" && value.trim() !== "") {
          validatedInsights[key.trim()] = value.trim();
        } else if (typeof value === "object" || Array.isArray(value)) {
          // Convert objects/arrays to readable strings
          try {
            validatedInsights[key.trim()] = JSON.stringify(value, null, 2);
          } catch {
            validatedInsights[key.trim()] = String(value);
          }
        } else {
          validatedInsights[key.trim()] = String(value);
        }
      } else {
        errors.push(`Invalid insight key: ${key}`);
      }
    });

    // Check if we have at least some expected insights
    const hasExpectedInsights = this.EXPECTED_INSIGHT_KEYS.some((expectedKey) =>
      Object.keys(validatedInsights).some((actualKey) =>
        actualKey
          .toLowerCase()
          .includes(expectedKey.toLowerCase().split(" ")[0])
      )
    );

    if (!hasExpectedInsights && Object.keys(validatedInsights).length === 0) {
      errors.push("No valid insights found in the expected format");
    }

    return { insights: validatedInsights, errors };
  }

  private static fallbackParsing(rawData: string): ParsedInsights {
    const fallbackInsights: ParsedInsights = {};

    // Try to extract insights using pattern matching
    if (
      rawData.toLowerCase().includes("portfolio") ||
      rawData.toLowerCase().includes("risk") ||
      rawData.toLowerCase().includes("performance")
    ) {
      // If the text seems to contain relevant information, create a general insight
      const truncatedText =
        rawData.length > 500 ? rawData.substring(0, 500) + "..." : rawData;
      fallbackInsights["Analysis Summary"] = truncatedText;
    }

    return fallbackInsights;
  }

  public static createEmptyResult(): ValidationResult {
    return {
      isValid: false,
      insights: {},
      errors: ["No data available"],
    };
  }
}
