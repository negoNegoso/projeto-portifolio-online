package com.fatec.siga.anotation;

import java.lang.annotation.Documented;

@Documented
@Constraint(validatedBy = FieldMatchValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FieldMatch{

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String message()default "Field do not match.";
    String first();
    String second();

    @Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {
        FieldMatch[] value();
    }

}
