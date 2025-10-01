import { v4 as uuidv4 } from "uuid";

/**
 * Generate a unique GUID for user identification
 * @returns {string} A unique GUID string
 */
export const generateUserGuid = (): string => {
  return uuidv4();
};

/**
 * Check if the current device is mobile
 * @returns {boolean} True if mobile device
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
};

/**
 * Mobile-optimized password validation with shorter feedback
 * @param {string} password - The password to validate
 * @returns {PasswordValidation} Validation result with mobile-optimized feedback
 */
export const validatePasswordMobile = (password: string): PasswordValidation => {
  const validation = validatePassword(password);
  
  if (isMobileDevice()) {
    // Shorten feedback messages for mobile
    const shortFeedback = {
      ar: validation.feedback.ar.replace(/كلمة مرور/g, 'كلمة'),
      en: validation.feedback.en.replace(/password/gi, 'pwd')
    };
    
    return {
      ...validation,
      feedback: shortFeedback
    };
  }
  
  return validation;
};

/**
 * Password strength levels
 */
export enum PasswordStrength {
  VERY_WEAK = 0,
  WEAK = 1,
  FAIR = 2,
  GOOD = 3,
  STRONG = 4,
}

/**
 * Password validation result interface
 */
export interface PasswordValidation {
  isValid: boolean;
  strength: PasswordStrength;
  score: number;
  missingRequirements: string[];
  feedback: {
    ar: string;
    en: string;
  };
}

/**
 * Check if password meets all requirements
 * Requirements:
 * - At least 8 characters
 * - Contains uppercase letter
 * - Contains lowercase letter
 * - Contains at least one number
 * - Contains at least one special character
 * @param {string} password - The password to validate
 * @returns {PasswordValidation} Validation result with feedback
 */
export const validatePassword = (password: string): PasswordValidation => {
  const requirements = [
    {
      regex: /.{8,}/,
      message: { ar: "على الأقل 8 أحرف", en: "At least 8 characters" },
      key: "length",
    },
    {
      regex: /[A-Z]/,
      message: {
        ar: "حرف كبير واحد على الأقل",
        en: "At least one uppercase letter",
      },
      key: "uppercase",
    },
    {
      regex: /[a-z]/,
      message: {
        ar: "حرف صغير واحد على الأقل",
        en: "At least one lowercase letter",
      },
      key: "lowercase",
    },
    {
      regex: /[0-9]/,
      message: { ar: "رقم واحد على الأقل", en: "At least one number" },
      key: "number",
    },
    {
      regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      message: {
        ar: "رمز خاص واحد على الأقل (!@#$%^&*)",
        en: "At least one special character (!@#$%^&*)",
      },
      key: "special",
    },
  ];

  const missingRequirements: string[] = [];
  let metRequirements = 0;

  requirements.forEach((req) => {
    if (!req.regex.test(password)) {
      missingRequirements.push(req.key);
    } else {
      metRequirements++;
    }
  });

  const score = (metRequirements / requirements.length) * 100;

  let strength: PasswordStrength;
  let feedback: { ar: string; en: string };

  if (metRequirements === 0) {
    strength = PasswordStrength.VERY_WEAK;
    feedback = {
      ar: "كلمة مرور ضعيفة جداً",
      en: "Very weak password",
    };
  } else if (metRequirements === 1) {
    strength = PasswordStrength.WEAK;
    feedback = {
      ar: "كلمة مرور ضعيفة",
      en: "Weak password",
    };
  } else if (metRequirements === 2 || metRequirements === 3) {
    strength = PasswordStrength.FAIR;
    feedback = {
      ar: "كلمة مرور متوسطة",
      en: "Fair password",
    };
  } else if (metRequirements === 4) {
    strength = PasswordStrength.GOOD;
    feedback = {
      ar: "كلمة مرور جيدة",
      en: "Good password",
    };
  } else {
    strength = PasswordStrength.STRONG;
    feedback = {
      ar: "كلمة مرور قوية",
      en: "Strong password",
    };
  }

  const isValid = missingRequirements.length === 0;

  return {
    isValid,
    strength,
    score,
    missingRequirements,
    feedback,
  };
};

/**
 * Get password strength color for UI
 * @param {PasswordStrength} strength - Password strength level
 * @returns {string} CSS color class
 */
export const getPasswordStrengthColor = (
  strength: PasswordStrength
): string => {
  const isMobile = isMobileDevice();
  
  switch (strength) {
    case PasswordStrength.VERY_WEAK:
      return isMobile ? "text-red-500" : "text-red-600";
    case PasswordStrength.WEAK:
      return isMobile ? "text-red-400" : "text-red-500";
    case PasswordStrength.FAIR:
      return isMobile ? "text-yellow-400" : "text-yellow-500";
    case PasswordStrength.GOOD:
      return isMobile ? "text-green-400" : "text-green-500";
    case PasswordStrength.STRONG:
      return isMobile ? "text-green-500" : "text-green-600";
    default:
      return isMobile ? "text-gray-400" : "text-gray-500";
  }
};

/**
 * Get password strength background color for progress bar
 * @param {PasswordStrength} strength - Password strength level
 * @returns {string} CSS background color class
 */
export const getPasswordStrengthBgColor = (
  strength: PasswordStrength
): string => {
  const isMobile = isMobileDevice();
  
  switch (strength) {
    case PasswordStrength.VERY_WEAK:
      return isMobile ? "bg-red-500" : "bg-red-600";
    case PasswordStrength.WEAK:
      return isMobile ? "bg-red-400" : "bg-red-500";
    case PasswordStrength.FAIR:
      return isMobile ? "bg-yellow-400" : "bg-yellow-500";
    case PasswordStrength.GOOD:
      return isMobile ? "bg-green-400" : "bg-green-500";
    case PasswordStrength.STRONG:
      return isMobile ? "bg-green-500" : "bg-green-600";
    default:
      return isMobile ? "bg-gray-400" : "bg-gray-300";
  }
};

/**
 * Mobile-optimized password requirements display
 * @returns {string[]} Array of requirement messages
 */
export const getMobilePasswordRequirements = (): string[] => {
  return [
    "8+ characters",
    "Uppercase letter",
    "Lowercase letter", 
    "Number",
    "Special character"
  ];
};

/**
 * Mobile-optimized password requirements display in Arabic
 * @returns {string[]} Array of requirement messages in Arabic
 */
export const getMobilePasswordRequirementsAr = (): string[] => {
  return [
    "8+ أحرف",
    "حرف كبير",
    "حرف صغير",
    "رقم",
    "رمز خاص"
  ];
};

/**
 * Get mobile-optimized password requirements based on locale
 * @param {string} locale - The locale (ar or en)
 * @returns {string[]} Array of requirement messages
 */
export const getMobilePasswordRequirementsByLocale = (locale: string): string[] => {
  return locale === "ar" ? getMobilePasswordRequirementsAr() : getMobilePasswordRequirements();
};
