INSERT IGNORE INTO rol (id, nombre, gatename) VALUES
  (UUID(), 'admin', 'admin_gate'),
  (UUID(), 'usuario', 'user_gate');

INSERT IGNORE INTO estado (id, nombre) VALUES
  (UUID(), 'pendiente'),
  (UUID(), 'aprobado'),
  (UUID(), 'rechazado');

INSERT IGNORE INTO categoria (id, nombre) VALUES
  (UUID(), 'Recientes'),
  (UUID(), 'SMS'),
  (UUID(), 'URL'),
  (UUID(), 'Email');

INSERT IGNORE INTO riesgo (id, nombre) VALUES
  (UUID(), 'Bajo'),
  (UUID(), 'Medio'),
  (UUID(), 'Alto');
  