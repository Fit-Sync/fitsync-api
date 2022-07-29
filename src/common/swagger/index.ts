import { SwaggerModule, SwaggerDocumentOptions, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export function swagger(app: NestExpressApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api', app, document);
}
